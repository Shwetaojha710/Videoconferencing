const employee = require("../../Models/employee");
const Helper = require("./../../Helper/helper");

exports.employeecreate = async (req, res) => {
  try {
    const { company_id, user_id, name, email, department_id, designation_id } =
      req.body;

    const empcreate = await employee.create({
      company_id: company_id,
      user_id: user_id,
      name: name,
      email: email,
      department_id: department_id,
      designation_id: designation_id,
      createdAt: new Date().getDate(),
      createBy: req.body.user_id,
      status: "ACTIVE",
    });
    if (empcreate) {
      Helper.response("success", "Employee Created successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Employee Creation", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
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
    const empdelete = await employee.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (empdelete) {
      Helper.response("success", "Employee Deleted successfully", {}, res, 200);
    } else {
      Helper.response("failed", "Failed to Employee Deletion", {}, res, 200);
    }
  } catch (err) {
    console.log(err);
  }
};


