const plan = require("../../models/plan");
const Helper = require("../../helper/helper");
const feature = require("../../models/feature");
const planfeature = require("../../models/planfeature");
const sequelize = require("../../Connection/sequelize.js");
const { Op } = require("sequelize");
const faq = require("../../models/faq.js");
const subscription = require("../../models/subscription.js");


exports.plansubscribed = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
         const data =req.body

    // const fk_company_id = req.users.company_id;

    // console.log(req.body);

    // Create the plan within the transaction
  let createsubscription = await subscription.create(obj,{transaction});

    if (createsubscription) {

      await transaction.commit();

      return Helper.response(
        "success",
        "Subscription Added successfully",
        {},
        res,
        200
      );
    } else {
      await transaction.rollback();
      return Helper.response("failed", "Failed to create Subscription", {}, res, 200);
    }
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return Helper.response("error", err.message,"An error occurred", res, 200);
  }
};