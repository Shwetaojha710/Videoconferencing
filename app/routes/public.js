const express = require("express");
const { publicplanlist, publicfaqlist } = require("../Controllers/company/plan");
const router = express.Router();

router.post('/public-plan-list',publicplanlist)
router.post('/public-faq-list',publicfaqlist)



module.exports = router