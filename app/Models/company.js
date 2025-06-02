const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const company  = sequelize.define('company',{
    company_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    subscription_plan_id:{
        type:DataTypes.STRING,
        allowNull:true
    },
    subscription_start:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    subscription_end:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true
    },
    created_by:{
        type:DataTypes.BIGINT,
        allowNull:true
    }
})
// sequelize
// .sync({alter:true})
//     .then(() => {
//         console.log("Database & tables created!");
//     })
//     .catch((error) => {
//         console.error("Error creating database & tables:", error);
//     });
module.exports = company