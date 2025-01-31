const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const users = sequelize.define("roomparticipants", {
    room_id :{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_id:{
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  joined_at: {
    type: DataTypes.DATE,
    allowNull: true,
   
  },  
  left_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
 
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
