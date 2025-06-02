const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const planfeature = sequelize.define("planfeature", {
    
    fk_plan_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
});
// Test Connection and Sync
// (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection established successfully!");
  
//       await sequelize.sync({ alter: true });
//       console.log("Database & table synced!");
//     } catch (error) {
//       console.error("Error connecting or syncing:", error);
//     }
//   })();
module.exports = planfeature