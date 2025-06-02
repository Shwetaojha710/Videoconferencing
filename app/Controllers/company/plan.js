const plan = require("../../models/plan");
const Helper = require("../../helper/helper");
const feature = require("../../models/feature");
const planfeature = require("../../models/planfeature");
const sequelize = require("../../Connection/sequelize.js");
const { Op } = require("sequelize");
const faq = require("../../models/faq.js");

exports.plancreate = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      plan_title,
      plan_desc,
      max_user,
      billing_cycle,
      trial_period,
      price,
      plan_description,
      trial,
      max_users,
      status,
      feature, // array of features
    } = req.body;

    const fk_company_id = req.users.company_id;

    console.log(req.body.status);

    // Create the plan within the transaction
    const plancreate = await plan.create(
      {
        fk_company_id: fk_company_id,
        plan_title,
        plan_desc,
        max_user,
        billing_cycle,
        trial_period,
        trial,
        price,
        max_users,
        plan_description,
        created_by: req.users.id,
        createdAt: new Date(),
        status,
      },
      { transaction }
    );

    if (plancreate) {
      const planid = plancreate.id;

      const planFeaturesData = feature.map((item) => ({
        ...item,
        fk_plan_id: planid,
        fk_company_id: fk_company_id,
        created_by: req.users?.id,
      }));

      await planfeature.bulkCreate(planFeaturesData, { transaction });

      await transaction.commit();

      return Helper.response(
        "success",
        "Plan Created successfully",
        {},
        res,
        200
      );
    } else {
      await transaction.rollback();
      return Helper.response("failed", "Failed to create plan", {}, res, 200);
    }
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return Helper.response("error", "An error occurred", {}, res, 500);
  }
};

exports.planlist = async (req, res) => {
  try {
    const planlist = (
      await plan.findAll({
        order: [["createdAt", "asc"]],
      })
    ).map((item) => item.toJSON());
    if (planlist && planlist.length > 0) {
      const data = await Promise.all(
        planlist.map(async (item) => {
          const features = await planfeature.findAll({
            where: {
              fk_plan_id: item.id,
            },
          });

          return {
            ...(item.toJSON?.() || item), // If `item` is a Sequelize instance
            features,
          };
        })
      );

      Helper.response(
        "success",
        "Data Found Successfully",
        { data: data },
        res,
        200
      );
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.plansubscribed = async (req, res) => {
  try {
    let plandt = req.body;
    let plansubscribed = await company.update(
      {
        subscription_plan_id: plandt.id,
        subscription_start: plandt.subscription_start,
        subscription_end: plandt.subscription_end,
        status: "SUBSCRIBED",
        created_by: plandt.created_by,
      },
      {
        where: {
          id: plandt.company_id,
        },
      }
    );
    if (plansubscribed) {
      Helper.response(
        "success",
        "Plan Subscribed successfully",
        plansubscribed,
        res,
        200
      );
    } else {
      Helper.response(
        "failed",
        "Failed to Plan Subscription",
        { data: totaldata },
        res,
        200
      );
    }
  } catch (err) {
    console.log(err);
  }
};

exports.featurecreate = async (req, res) => {
  try {
    let featuredt = req.body;
    let featurecreate = await feature.create({
      fk_company_id: req.users.company_id,
      name: featuredt.name,
      status: featuredt.status ? featuredt.status : true,
      created_by: req.users.id,
    });
    if (featurecreate) {
      Helper.response(
        "success",
        "Feature Created successfully",
        featurecreate,
        res,
        200
      );
    } else {
      Helper.response("failed", "Failed to Create Feature", {}, res, 200);
    }
  } catch (error) {
    console.log(error);
    Helper.response(
      "failed",
      error.mesage,
      "Falied to create a feature",
      res,
      200
    );
  }
};

exports.featurelist = async (req, res) => {
  try {
    const featureListdt = await feature.findAll({
      order: [["createdAt", "asc"]],
    });
    if (featureListdt && featureListdt.length > 0) {
      return Helper.response(
        "success",
        "Data Found Successfully",
        { tableData: featureListdt },
        res,
        200
      );
    } else {
      return Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
    Helper.response("failed", "Falied to get feature list", {}, res, 200);
  }
};

exports.deletefeature = async (req, res) => {
  try {
    const id = req.body?.id;
    if (!id) {
      return Helper.response("failed", "id is required", {}, res, 200);
    }
    const deletefeature = await feature.destroy({ where: { id: id } });
    if (deletefeature) {
      return Helper.response(
        "success",
        "Feature deleted successfully",
        { message: "Feature deleted successfully" },
        res,
        200
      );
    } else {
      return Helper.response(
        "failed",
        "Failed to delete feature",
        { message: "Failed to delete feature" },
        res,
        200
      );
    }
  } catch (err) {
    console.log(err);
    return Helper.response(
      "failed",
      err.message,
      "Falied to delete feature",
      res,
      200
    );
  }
};

//update feature
exports.updatefeature = async (req, res) => {
  try {
    const id = req.body?.id;
    const name = req.body?.name;
    const status = req.body?.status;
    if (!id) {
      return Helper.response(
        "failed",
        "id is required",
        "id is required",
        res,
        200
      );
    }
    const updatefeature = await feature.update(
      {
        name,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!updatefeature) {
      return Helper.response(
        "failed",
        "feature not found",
        "feature not found",
        res,
        200
      );
    }
    Helper.response(
      "success",
      "feature updated successfully",
      "feature updated successfully",
      res,
      200
    );
  } catch (error) {
    Helper.response(
      "failed",
      "internal server error",
      "internal server error",
      res,
      200
    );
  }
};

exports.plandelete = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const id = req.body.id;
    if (!id) {
      await transaction.rollback();
      return Helper.response(
        "failed",
        "id is required",
        "id is required",
        res,
        200
      );
    }
    const deletefeature = await plan.destroy({
      where: {
        id: id,
      },
      transaction,
    });

    const deleteplafeature = await planfeature.destroy({
      where: {
        fk_plan_id: id,
      },
      transaction,
    });

    if (!deletefeature) {
      await transaction.rollback();
      return Helper.response(
        "failed",
        "feature not found",
        "feature not found",
        res,
        200
      );
    }
    await transaction.commit();
    Helper.response(
      "success",
      "feature deleted successfully",
      "feature deleted successfully",
      res,
      200
    );
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    Helper.response(
      "failed",
      error?.message,
      "Internal server error",
      res,
      200
    );
  }
};

exports.planupdate = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const data = req.body;
    const updateplan = await plan.update(data, {
      where: { id: data.id },
      transaction,
    });

    if (updateplan[0] === 0) {
      await transaction.rollback();
      return Helper.response(
        "failed",
        "plan not found",
        "plan not found",
        res,
        200
      );
    }

    await planfeature.destroy({
      where: { fk_plan_id: data.id }, // ✅ fix typo
      transaction,
    });

    const planFeaturesData = data.feature.map((item) => ({
      ...item,
      fk_plan_id: data.id,
      fk_company_id: req.users.company_id,
      created_by: req.users?.id,
    }));

    await planfeature.bulkCreate(planFeaturesData, { transaction });

    await transaction.commit();
    return Helper.response("success", "Successfully Updated ", {}, res, 200);
  } catch (error) {
    await transaction.rollback();
    Helper.response(
      "failed",
      error?.message,
      "Internal server error",
      res,
      200
    );
  }
};

exports.publicplanlist = async (req, res) => {
  try {
    const planlist = (
      await plan.findAll({
        order: [["createdAt", "asc"]],
      })
    ).map((item) => item.toJSON());
    if (planlist && planlist.length > 0) {
      const data = await Promise.all(
        planlist.map(async (item) => {
          const features = await planfeature.findAll({
            where: {
              fk_plan_id: item.id,
            },
          });

          let allfeature = await feature.findAll();

          const featureIds = features.map((f) => f.value);
          const remainingFeatures = allfeature.filter(
            (f) => !featureIds.includes(f.id)
          );

          const nonIncludedFeatures = remainingFeatures.map((f) => ({
            label: f.name,
            status: false,
          }));

          const mergedFeatures = [...features, ...nonIncludedFeatures];

          return {
            id: item.id,
            name: item.plan_title,
            description: item.plan_description,
            price: item.price,
            max_users: Number(item.max_users),
            billing_cycle:item.billing_cycle,
            features: mergedFeatures.map((feature) => ({
              text: feature.label,
              included: feature.status,
            })),
          };
        })
      );

      Helper.response(
        "success",
        "Data Found Successfully",
        { data: data },
        res,
        200
      );
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.publicfaqlist = async (req, res) => {
  try {
    let FAQList = await faq.findAll({
      order: [["createdAt", "asc"]],
    });
    if (FAQList.length > 0) {
      const data = await Promise.all(
        FAQList.map(async (item) => {
          return {
            id: item.id,
            headData: item.question,
            bodyData: item.answer,
          };
        })
      );

      return Helper.response(
        "success",
        "Data Found successfully",
        data,
        res,
        200
      );
    } else {
      return Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (error) {
    console.log(error);
    return Helper.response(
      "failed",
      error.message,
      "Internal Server Error",
      res,
      200
    );
  }
};
