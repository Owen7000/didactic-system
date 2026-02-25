const express = require("express");
const router = express.Router();

const { sendBasicDashboardData } = require("../controllers/dashboard.controller");

router.post("/dashboard", sendBasicDashboardData);

module.exports = router;