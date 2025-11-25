const company = require("../../models/company");
const users = require("../../models/users");
const { createUser } = require("../Admin/users");
const Helper = require("../../helper/helper");
const sequelize = require("../../Connection/sequelize");
const { col } = require("sequelize");
exports.Register = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      company_name,
      email,
      mobile,
      address,
      subscription_plan_id,
      subscription_start,
      subscription_end,
      status,
      username,
    } = req.body;
    const companycreate = await company.create(
      {
        company_name: company_name,
        email: email,
        mobile: mobile,
        address: address,
        subscription_plan_id: subscription_plan_id,
        subscription_start: subscription_start,
        subscription_end: subscription_end,
        status: status,
      },
      { transaction } // Pass transaction
    );
    if (companycreate) {
      const userEntry = await users.create(
        {
          name: companycreate.company_name,
          company_id: companycreate.id,
          email: email,
          username: username,
          mobile: companycreate.mobile,
          role: "company",
          password: Helper.encryptPassword("123456"),
        },
        { transaction } // Pass transaction
      );
      if (userEntry) {
        await company.update(
          {
            created_by: userEntry.id,
          },
          {
            where: {
              id: companycreate.id,
            },
            transaction,
          }
        );
        await users.update(
          {
            created_by: userEntry.id,
          },
          {
            where: {
              id: companycreate.id,
            },
            transaction,
          }
        );
        let findata = { companycreate, userEntry };
        // Commit the transaction
        await transaction.commit();
        Helper.response(
          "success",
          "Company and user registered successfully",
          findata,
          res,
          200
        );
      } else {
        // Rollback the transaction on error
        await transaction.rollback();

        Helper.response("failed", "Failed to register user", {}, res, 200);
      }
    } else {
      // Rollback the transaction on error
      await transaction.rollback();
      Helper.response("failed", "Failed to register company", {}, res, 200);
    }
  } catch (err) {
    // Rollback the transaction on error
    await transaction.rollback();
    Helper.response("failed", "Internal Server Error", {}, res, 200);
    console.log(err);
    next(err);
  }
};

// get company data

exports.getcompanydata = async (req, res) => {
  try {
    let company_data = await company.findAll();
    if (company_data) {
      Helper.response(
        "success",
        "Company Data Found successfully",
        company_data,
        res,
        200
      );
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (error) {
    console.log(error);
    Helper.response("failed", "Internal Server Error", {}, res, 200);
  }
};

exports.companylistdd = async (req, res) => {
  try {
    let company_data = await company.findAll({
      attributes: [
        [col("company_name"), "label"],
        [col("id"), "value"],
      ],
      where: {
        status: "active",
      },
      order: [["createdAt", "ASC"]],
    });

    if (company_data) {
      Helper.response(
        "success",
        "Company Data Found successfully",
        company_data,
        res,
        200
      );
    } else {
      Helper.response("failed", "No Data Found", {}, res, 200);
    }
  } catch (error) {
    console.log(error);
    Helper.response("failed", "Internal Server Error", {}, res, 200);
  }
};

// delete company

exports.deletecompany = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const company_id = req.body.id;

    const deletedCompany = await company.destroy({
      where: {
        id: company_id,
      },
      transaction,
    });

    if (deletedCompany) {
      const delteuser = await users.destroy({
        where: {
          company_id: company_id,
        },
        transaction,
      });
      if (delteuser) {
        await transaction.commit();

        Helper.response(
          "success",
          "Company and user deleted successfully",
          {},
          res,
          200
        );
      } else {
        await transaction.rollback();
        Helper.response("failed", "User not found", {}, res, 200);
      }
    } else {
      await transaction.rollback();
      Helper.response("failed", "Company not found", {}, res, 200);
    }
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error(err);
  }
};

// update company

exports.Updatecompany = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const companyDT = req.body;
    const updateData = {};
    if (companyDT.company_name) {
      updateData.company_name = companyDT.company_name;
    }

    if (companyDT.email) {
      updateData.email = companyDT.email;
    }

    if (companyDT.mobile) {
      updateData.mobile = companyDT.mobile;
    }

    const updateCompany = await company.update(updateData, {
      where: {
        id: companyDT.id,
      },
      transaction,
    });

    if (updateCompany) {
      const updateuser = await users.update(
        {
          name: updateCompany.company_name,
          email: companyDT.email,
          mobile: companyDT.mobile,
        },
        {
          where: {
            company_id: companyDT.id,
          },
          transaction,
        }
      );
      if (updateuser) {
        await transaction.commit();

        Helper.response(
          "success",
          "Company and user Update successfully",
          {},
          res,
          200
        );
      } else {
        await transaction.rollback();
        Helper.response("failed", "User not found", {}, res, 200);
      }
    } else {
      await transaction.rollback();
      Helper.response("failed", "Company not found", {}, res, 200);
    }
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error(err);
  }
};
