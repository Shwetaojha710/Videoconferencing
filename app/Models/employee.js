const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const employee = sequelize.define("employee", {
  company_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  

  department_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  designation_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue:true

  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
employee.sync({ alter: true }) // Alters table to match model (non-destructive)
  .then(() => {
    console.log('Table altered successfully!');
  })
  .catch((error) => {
    console.error('Error altering table:', error);
  });
module.exports = employee