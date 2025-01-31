
const { joinmeeting } = require("../Controllers/vedioconfrencing/meeting");
const vedioconfrencingRoutes = async (fastify, options) => {
  
    
  
    // Define routes
    fastify.post("/joinmeeting", async (request, reply) => {
      return joinmeeting(request, reply);
    });
  
    // fastify.post("/company-register", async (request, reply) => {
    //   return Register(request, reply);
    // });
  
    // fastify.post("/deletecompany", async (request, reply) => {
    //   return deletecompany(request, reply);
    // });
    // fastify.post("/Updatecompany", async (request, reply) => {
    //   return Updatecompany(request, reply);
    // });
    // fastify.post("/getcompanydata", async (request, reply) => {
    //   return getcompanydata(request, reply);
    // });
  };
  
  module.exports = vedioconfrencingRoutes;
  