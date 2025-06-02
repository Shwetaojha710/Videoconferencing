const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");
const company = require("./company");

const plan = sequelize.define("plan", {
    
    fk_company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    plan_title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    plan_description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    max_users: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    billing_cycle:{
        type:DataTypes.STRING,
        allowNull:false
    },
    trial_period:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        trial: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    //    trial_in_days: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    // },
    created_by: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
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
module.exports = plan