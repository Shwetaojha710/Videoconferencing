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
    const data = req.body;
    data["stauts"] = true;
    data["created_by"] = req.users?.id;
    // Create the subscription entry within the transaction
    const createsubscription = await subscription.create(data, { transaction });

    if (createsubscription) {
      await transaction.commit();

      return Helper.response(
        "success",
        "Subscription Added successfully",
        createsubscription, // Optional: return the created object
        res,
        200
      );
    } else {
      await transaction.rollback();
      return Helper.response(
        "failed",
        "Failed to create Subscription",
        {},
        res,
        200
      );
    }
  } catch (err) {
    await transaction.rollback();
    console.error("Error creating subscription:", err);

    return Helper.response("error", err.message, "An error occurred", res, 500);
  }
};

exports.subscriptionlist = async (req, res) => {
  try {
    const subscriptiondata = await subscription.findAll({
      order: [["createdAt", "desc"]],
    });
    if (subscriptiondata && subscriptiondata.length > 0) {
      return Helper.response(
        "success",
        "Subscription List",
        subscriptiondata, // Optional: return the created object
        res,
        200
      );
    } else {
      return Helper.response(
        "failed",
        "Failed to get Subscription List",
        {},
        res,
        200
      );
    }
  } catch (err) {
    console.error("Error creating subscription:", err);

    return Helper.response("error", err.message, "An error occurred", res, 500);
  }
};
