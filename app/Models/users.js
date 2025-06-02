const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const users = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_id:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },  
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("admin", "company", "employee","user"),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
  }
});
// users.sync({ alter: true }) // Alters table to match model (non-destructive)
//   .then(() => {
//     console.log('Table altered successfully!');
//   })
//   .catch((error) => {
//     console.error('Error altering table:', error);
//   });
module.exports = users;
