const { plancreate,planlist } = require("../Controllers/company/plan");
const { employeecreate,employeeList,deleteemployee } = require("../Controllers/company/employee");

async function adminRoutes(fastify, opts) {
  // POST route for plan creation
  fastify.post("/plancreate", async (request, reply) => {
    const { body } = request;
    return plancreate(body, reply);
  });
  // POST route for plan list
  fastify.post("/planlist", async (request, reply) => {
    const { body } = request;
    return planlist(body, reply);
  });
   fastify.post("/employeecreate", async (request, reply) => {
      const { body } = request;
      return employeecreate(body, reply);
    });
    // POST route for plan list
    fastify.post("/employeeList", async (request, reply) => {
      const { body } = request;
      return employeeList(body, reply);
    });
    fastify.post("/deleteemployee", async (request, reply) => {
      const { body } = request;
      return deleteemployee(body, reply);
    });
}


module.exports = adminRoutes;
