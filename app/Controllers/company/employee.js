const employee = require("../../models/employee");
const faq = require("../../models/faq");
const users = require("../../models/users");
const Helper = require("./../../helper/helper");
const sequelize = require("../../Connection/sequelize");
const plan = require("../../models/plan");
const subscription = require("../../models/subscription");
exports.employeecreate = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const empcreate = await employee.create(
      {
        company_id: req.users?.company_id,
        name: name,
        email: email,
        password: Helper.encryptPassword(password),
        createdAt: new Date().getDate(),
        status: true,
      },
      { transaction }
    );
    if (empcreate) {
      const usercreate = await users.create(
        {
          company_id: req.users?.company_id,
          name: name,
          username: name,
          email: email,
          password: Helper.encryptPassword(password),
          role: "user",
          status: true,
        },
        { transaction }
      );

      await transaction.commit();
      return Helper.response(
        "success",
        "Employee Created Successfully",
        {},
        res,
        200
      );
    } else {
      await transaction.rollback();
      return Helper.response(
        "failed",
        "Failed to Employee Creation",
        {},
        res,
        200
      );
    }
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return Helper.response(
      "failed",
      err?.message,
      "Failed to Employee Creation",
      res,
      200
    );
  }
};

exports.employeeList = async (req, res) => {
  try {
    let employeeList = await employee.findAll();
    if (employeeList) {
      Helper.response(
        "success",
        "Data Found successfully",
        employeeList,
        res,
        200
      );
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteemployee = async (req, res) => {
  try {
    console.log(req.body.id);
    const empdelete = await employee.destroy({
      where: {
        id: req.body.id,
      },
    });
    console.log(empdelete, "okkay employee delete");
    if (empdelete) {
      Helper.response("success", "Employee Deleted successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Employee Deletion", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateempstatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || typeof status !== "boolean") {
      return Helper.response(
        "failed",
        "Invalid 'id' or 'status' in request body.",
        {},
        res,
        200
      );
    }

    const updated = await employee.update(
      { status: !status }, // Toggle status
      { where: { id } }
    );

    if (updated[0] === 0) {
      return Helper.response(
        "failed",
        "Employee not found or no changes applied.",
        {},
        res,
        200
      );
    }
    Helper.response(
      "success",
      "Employee status updated successfully.",
      {},
      res,
      200
    );
  } catch (error) {
    console.error("Error updating employee status:", error);
    return Helper.response(
      "failed",
      error?.message,
      "Internal Server Error",
      res,
      200
    );
  }
};

exports.faqcreate = async (req, res) => {
  try {
    const { answer, question } = req.body;
    console.log(req.body);

    const faqcreate = await faq.create({
      company_id: req.users?.company_id,
      answer: answer,
      question: question,
      createdAt: new Date().getDate(),
      status: true,
    });
    if (faqcreate) {
      return Helper.response(
        "success",
        "FAQ Addedd successfully",
        {},
        res,
        200
      );
    } else {
      return Helper.response("failed", "Failed to Added FAQ", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
    return Helper.response(
      "failed",
      err.message,
      "Internal Server Error",
      res,
      200
    );
  }
};

exports.faqList = async (req, res) => {
  try {
    let FAQList = await faq.findAll({
      order: [["createdAt", "asc"]],
    });
    if (FAQList.length > 0) {
      Helper.response("success", "Data Found successfully", FAQList, res, 200);
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
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

exports.deletefaq = async (req, res) => {
  try {
    console.log(req.body.id);
    const faqdelete = await faq.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (faqdelete) {
      Helper.response("success", "FAQ Deleted successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to FAQ Deletion", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
    return Helper.response(
      "failed",
      err.message,
      "Internal Server Error",
      res,
      200
    );
  }
};

exports.updateFaq = async (req, res) => {
  try {
    let data = req.body;
    const faqupdate = await faq.update(data, {
      where: {
        id: req.body.id,
      },
    });

    if (faqupdate) {
      Helper.response("success", "FAQ Updated successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to FAQ Updation", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
    return Helper.response(
      "failed",
      err.message,
      "Internal Server Error",
      res,
      200
    );
  }
};

// exports.companyDashboard = async (req, res) => {
//   try {
//     const plandata = await plan.findAll({
//       where: {
//         fk_company_id: req.user.company_id,
//       },
//     });
//     const subscriptiondata = await subscription.findAll({
//       where: {
//         company_id: req.user.company_id,
//       },
//     });

//     return Helper.response(
//       "success",
//       "Data Found Successfully",
//       { plandata, subscriptiondata },
//       res,
//       200
//     );
//   } catch (error) {
//     console.log(error);
//     return Helper.response("failed",error.message,"Internal Server Erorr",res,200)
//   }
// };
