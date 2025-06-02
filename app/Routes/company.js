const express = require("express");
const router = express.Router();

const { plancreate,planlist,featurelist,featurecreate,updatefeature,deletefeature, plandelete ,planupdate} = require("../Controllers/company/plan");
const { employeecreate,employeeList,deleteemployee,updateempstatus ,faqcreate, updateFaq, deletefaq, faqList} = require("../Controllers/company/employee");

const { createmeeting, meetinglist } = require("../Controllers/vedioconfrencing/meeting");
const { Admin } = require("../middleware/auth");
const { companylistdd } = require("../Controllers/Auth/register");
const { plansubscribed,subscriptionlist } = require("../Controllers/company/subscription");
router.post('/plan-create',Admin,plancreate)
router.post('/plan-subscribe',Admin,plansubscribed)
router.post('/plan-list',Admin,planlist)
router.post('/delete-plan',Admin,plandelete)
router.post('/update-plan',Admin,planupdate)
router.post('/feature-create',Admin,featurecreate)
router.post('/feature-list',Admin,featurelist)
router.post('/update-feature',Admin,updatefeature)
router.post('/delete-feature',Admin,deletefeature)
router.post('/employee-create',employeecreate)
router.post('/employee-List',Admin,employeeList)
router.post('/delete-employee',Admin,deleteemployee)
router.post('/employee-status-update',Admin,updateempstatus)
router.post('/create-meeting',Admin,createmeeting)
router.post('/meeting-list',Admin,meetinglist)
router.post('/faq-create',Admin,faqcreate)
router.post('/faq-list',Admin,faqList)
router.post('/delete-faq',Admin,deletefaq)
router.post('/update-faq',Admin,updateFaq)
router.post('/company-list-dd',companylistdd)
router.post('/subscription-list',subscriptionlist)





module.exports = router
