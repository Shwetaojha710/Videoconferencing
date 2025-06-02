const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");
const Helper = require("../../helper/helper");
const users = require("../../models/users");
const employee = require("../../models/employee");


exports.login = async (req, res) => {
    try {
        const data = req.body;
        const user = await users.findOne({
          where: {
         email: req.body.email 
          },
        });
      
        if (!user) {
         return Helper.response("failed", "User not exists!", {}, res, 200);
        }
      
        if (data.password == Helper.decryptPassword(user.password)) {
          let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });
         console.log(token,"token is this:-")
          const updateToken = await users.update(
            { token: token },
            {
              where: {
                 email: req.body.email 
              },
            }
          );
          console.log(req.body.email,"email id");
          
//           const [affectedRows] = await users.update(
//   { token: token },
//   {
//     where: {
//       email: req.body.email 
//     },
//   }
// );
         const getuser=await users.findOne({
          where: {
         email: req.body.email 
          },
        });
          if (updateToken) {
          return  Helper.response(
              "success",
              "Logged In Successfully!",
              { userData: getuser },
              res,
              200
            );
          }
        } else {
        return  Helper.response(
            "failed",
            "Login Id or Password is invalid!",
            {},
            res,
            200
          );
        }
    } catch (error) {
       return Helper.response("failed", "Internal Server Error", {}, res, 200); 
    }
 
};


exports.logout = async (req, res) => {

  try {
      const token = req.headers["authorization"];
      const string = token.split(" ");
      const tokenUpdate = await users.update(

          { token: "" },

          { where: { token: string[1] } }
      );
      Helper.response("success",  "Logout Successfully", {}, res, 200);
  } catch (error) {
      // console.log(error);
      Helper.response("failed", "Unable to Logout ", error, res, 200);
  }
};

exports.employeelogin = async (req, res) => {
    try {
        const data = req.body;
        const user = await employee.findOne({
          where: {
         email: req.body.email 
          },
        });
      
        if (!user) {
         return Helper.response("failed", "User not exists!", {}, res, 200);
        }
      
        if (data.password == Helper.decryptPassword(user.password)) {
          let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
          });
         console.log(token,"token is this:-")
          const updateToken = await users.update(
            { token: token },
            {
              where: {
                 email: req.body.email 
              },
            }
          );
          console.log(req.body.email,"email id");
          
//           const [affectedRows] = await users.update(
//   { token: token },
//   {
//     where: {
//       email: req.body.email 
//     },
//   }
// );
         const getuser=await users.findOne({
          where: {
         email: req.body.email 
          },
        });
          if (getuser) {
            let data =getuser.toJSON()
            data["base_url"]=process.env.BASE_URL
          return  Helper.response(
              "success",
              "Logged In Successfully!",
              { userData: data },
              res,
              200
            );
          }
        } else {
        return  Helper.response(
            "failed",
            "Login Id or Password is invalid!",
            {},
            res,
            200
          );
        }
    } catch (error) {
      console.log(error)
       return Helper.response("failed", error.message,"Internal Server Error",  res, 200); 
    }
};
