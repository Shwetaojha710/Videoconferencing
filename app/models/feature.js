const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const feature = sequelize.define("feature", {
    
    fk_company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    name: {
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
module.exports = feature