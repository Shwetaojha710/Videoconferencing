const { DataTypes } = require("sequelize");
const sequelize = require("../Connection/sequelize");

const meeting = sequelize.define("meeting", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  meeting_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   meeting_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   passcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   email_id: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Using ARRAY to store an array of Integer
    allowNull: true,
  },
  
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

meeting.sync({ alter: true }) // Alters table to match model (non-destructive)
  .then(() => {
    console.log('Table altered successfully!');
  })
  .catch((error) => {
    console.error('Error altering table:', error);
  });
module.exports = meeting;
