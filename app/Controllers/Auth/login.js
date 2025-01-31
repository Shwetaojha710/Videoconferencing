const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");
const Helper = require("../../Helper/helper");
const users = require("../../Models/users");


exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await users.findOne({
          where: {
            [Op.or]: [{ username: req.body.login_id }, { email: req.body.login_id }],
          },
        });
      
        if (!user) {
          Helper.response("failed", "User not exists!", {}, res, 200);
        }
      
        if (data.password == Helper.decryptPassword(user.password)) {
          let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });
      
          const updateToken = await user.update(
            { auth_key: token },
            {
              where: {
                [Op.or]: [
                  { username: req.body.login_id },
                  { email: req.body.login_id },
                ],
              },
            }
          );
          if (updateToken) {
            Helper.response(
              "success",
              "Logged In Successfully!",
              { userData: user },
              res,
              200
            );
          }
        } else {
          Helper.response(
            "failed",
            "Login Id or Password is invalid!",
            {},
            res,
            200
          );
        }
    } catch (error) {
        Helper.response("failed", "Internal Server Error", {}, res, 200); 
    }
 
};