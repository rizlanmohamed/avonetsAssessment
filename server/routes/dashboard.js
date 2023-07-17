var express = require("express");
var router = express.Router();

const dashboardController = require("../controllers/dashboardController");

router.get('/PieChart', dashboardController.pieChart);
router.get('/BalanceSummary', dashboardController.balanceSummary);

module.exports = router;
