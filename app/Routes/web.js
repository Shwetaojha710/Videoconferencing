const webRoutes = async (fastify, options) => {
  const { login } = require("../Controllers/Auth/login");
  const { Register ,deletecompany,Updatecompany,getcompanydata} = require("../Controllers/Auth/register");

  // Define routes
  fastify.post("/login", async (request, reply) => {
    return login(request, reply);
  });

  fastify.post("/company-register", async (request, reply) => {
    return Register(request, reply);
  });

  fastify.post("/deletecompany", async (request, reply) => {
    return deletecompany(request, reply);
  });
  fastify.post("/Updatecompany", async (request, reply) => {
    return Updatecompany(request, reply);
  });
  fastify.post("/getcompanydata", async (request, reply) => {
    return getcompanydata(request, reply);
  });
};

module.exports = webRoutes;
