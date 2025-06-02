const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const subscription = sequelize.define("subscription", {
  plan_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  company_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  plan_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  max_users: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plan_detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coupon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  gst: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  charge_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_amount: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardHolderName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cardNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  next_charge_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cvv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  acceptedTerms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  //  companyName: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  //  selectedPlan: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },

  created_by: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
// Test Connection and Sync
// subscription.sync({ alter: true }) // Alters table to match model (non-destructive)
//   .then(() => {
//     console.log('Table altered successfully!');
//   })
//   .catch((error) => {
//     console.error('Error altering table:', error);
//   });
module.exports = subscription;
