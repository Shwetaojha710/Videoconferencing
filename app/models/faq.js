const { DataTypes } = require('sequelize');
// const log=require('./log');
const sequelize = require('../Connection/sequelize');
const faq = sequelize.define("faq", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
});



// faq.afterCreate(async (faqs,options)=>{
//   await log.create({
//       tableName: "faq",
//       recordId: faqs.id,
//       module:faqs.mdoule,
//       action: "CREATE",
//       oldData: faqs.toJSON(),
//       newData: null,
//       changedBy: options.user || "System",
//   });
// })


// faq.beforeUpdate(async (faqs, options) => {
//   const originalData = await faq.findByPk(faqs.id);
//   await log.create({
//       tableName: "faqs",
//       recordId: faqs.id,
//       module:faqs.mdoule,
//       action: "UPDATE",
//       oldData: originalData.toJSON(),
//       newData: faqs.toJSON(),
//       createdBy: faqs.id || "System",
//   });
// });


// faq.beforeDestroy(async (faqs, options) => {
//   await log.create({
//       tableName: "faqs",
//       recordId: faqs.id,
//       module:faqs.mdoule,
//       action: "DELETE",
//       oldData: faqs.toJSON(),
//       newData: null,
//       createdBy: faqs.id || "System",
//   });
// });


faq.sync({ alter: true }) // Alters table to match model (non-destructive)
  .then(() => {
    console.log('faqTable altered successfully!');
  })
  .catch((error) => {
    console.error('Error altering table:', error);
  });

module.exports = faq;
