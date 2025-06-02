const express = require("express");
const router = express.Router();
  const { login, logout, employeelogin } = require("../Controllers/Auth/login");
  const { Register ,deletecompany,Updatecompany,getcompanydata} = require("../Controllers/Auth/register");

router.post('/login',login)
router.post('/emp-login',employeelogin)
router.post('/logout',logout)
router.post('/company-register',Register)
router.post('/deletecompany',deletecompany)
router.post('/Updatecompany',Updatecompany)
router.post('/getcompanydata',getcompanydata)

// publicc
// router.post('/get-menu-data',menudata)
// router.post('/get-home-banner-image',gethomebannerImage)
// router.post('/get-document',getdocument)
// router.post('/get-page',gethtmldata)
module.exports = router

// const webRoutes = async (fastify, options) => {

//   // Define routes
//   fastify.post("/login", async (request, reply) => {
//     return login(request, reply);
//   });

//   fastify.post("/company-register", async (request, reply) => {
//     return Register(request, reply);
//   });

//   fastify.post("/deletecompany", async (request, reply) => {
//     return deletecompany(request, reply);
//   });
//   fastify.post("/Updatecompany", async (request, reply) => {
//     return Updatecompany(request, reply);
//   });
//   fastify.post("/getcompanydata", async (request, reply) => {
//     return getcompanydata(request, reply);
//   });
// };

// module.exports = webRoutes;
