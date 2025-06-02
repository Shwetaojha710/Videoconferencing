const Helper = {};
const CryptoJS = require("crypto-js");
const users = require("../models/users");
var nodemailer = require("nodemailer");

Helper.response = (status, message, data = [], res, statusCode) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data,
  });
};

// Helper.response = (status, message, data = [], reply, statusCode) => {
//   reply.code(statusCode).send({
//     status: status,
//     message: message,
//     data,
//   });
// };

Helper.encryptPassword = (password) => {
  console.log("Password:", password);
  var pass = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
  return pass;
};

Helper.decryptPassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
  var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  return originalPassword;
};


Helper.getUserId = async (req) => {
  const token = req.headers['authorization'];
  const string = token.split(" ");
  const user = await users.findOne({ where: { token: string[1] } });
}

Helper.mail = (To, subject, text) => {
  try {
    const mailHost = 'smtppro.zoho.in';
    const mailPort = 465;
    const mailUsername = 'donotreply@quaeretech.com';
    const mailPassword = 'Quaere123@';
    const MAIL_ENCRYPTION = 'ssl';
    const mailFromAddress = 'donotreply@quaeretech.com';
    const mailFromName = 'PGICH';
   
    const transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: true,
      auth: {
        user: mailUsername,
        pass: mailPassword
      }
    });

    const mailOptions = {
      from: {
        address: mailFromAddress,
        name: mailFromName
      },
      to: To,
      subject: subject,
      html: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error('Error:', error);
      }
      console.log('Email sent:', info.response);
    });
return true
  } catch (error) {
console.log(error)
  }
}


module.exports = Helper;