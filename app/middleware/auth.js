

const jwt = require('jsonwebtoken')
const users = require('../models/users');
const helper = require('../helper/helper');
const meeting = require('../models/meeting');

const Admin = async (req, res, next) => {
  const newtoken = req.headers["authorization"];

  try {
    const string = newtoken?.split(" ");
    const token = string?.[1];

    const user = await users.findOne({
      where: { token },
    });

    if (user) {
      try {
        const tokens = jwt.verify(token, process.env.SECRET_KEY);
        user.lang = req.headers.lang;
        req.users = user;
        next();
      } catch (error) {
         return helper.response("expired", "Your Token is expired", {}, res, 200);
      }
    } else {
       return helper.response("expired","Token Expired due to another login, Login Again!!", {}, res, 200);
    }
  } catch (error) {
    return helper.response("expired", error.message, "Unauthorized Access", res, 200);
  }
};

module.exports={
     Admin: Admin
}