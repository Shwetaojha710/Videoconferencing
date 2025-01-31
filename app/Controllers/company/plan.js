const plan = require("../../Models/plan");
const Helper=require("../../Helper/helper")

exports.plancreate = async (req, res) => {
  try {
    const {
      fk_company_id,
      plan_name,
      plan_type,
      plan_desc,
      max_user,
      billing_cycle,
      trial_period,
      price,
      created_by,
    } = req.body;

    const plancreate = await plan.create({
   
      plan_name: plan_name,
      plan_type: plan_type,
      plan_desc: plan_desc,
      max_user: max_user,
      billing_cycle: billing_cycle,
      trial_period: trial_period,

      price: price,
      created_by: created_by,
      createdAt: new Date().getDate(),

      status: "ACTIVE",
    });
    if (plancreate) {
      Helper.response("success", "Plan Created successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Plan Creation", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
    
  }
};

exports.planlist = async (req, res) => {
  try {
    const planlist = await plan.findAll();
    if (planlist && planlist.length>0) {
      Helper.response(
        "success",
        "Data Found Successfully",
        { data: planlist },
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
    let plandt=req.body
    let plansubscribed = await company.update(
      { subscription_plan_id: plandt.id ,
        subscription_start: plandt.subscription_start,
        subscription_end: plandt.subscription_end,
        status: 'SUBSCRIBED',
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
