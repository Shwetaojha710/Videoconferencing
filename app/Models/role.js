const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const users = sequelize.define("role", {
  fk_company_id:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role_cd: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },  
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resource: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Using ARRAY to store an array of strings
    allowNull: true,
  },
  
  created_by: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: 0,
  }
});
// sequelize
//     .sync({alter:true})
//     .then(() => {
//         console.log("Database & tables created!");
//     })
//     .catch((error) => {
//         console.error("Error creating database & tables:", error);
//     });
module.exports = users;
