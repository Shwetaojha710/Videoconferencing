const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const company = sequelize.define("callsession", {
  call_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fk_initiator_user_id: {
    type: DataTypes.STRING,
    allowNull: false,// Make it required
  },
  fk_reciver_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cal_type: {
    type: DataTypes.ENUM, // Define as ENUM
    values: ["AUDIO", "VIDEO", "GROUP"], // Allowed ENUM values
    allowNull: true, 
  },

  start_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
// sequelize
// .sync({alter:true})
//     .then(() => {
//         console.log("Database & tables created!");
//     })
//     .catch((error) => {
//         console.error("Error creating database & tables:", error);
//     });
module.exports = company;
