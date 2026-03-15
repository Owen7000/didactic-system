const express = require("express");
const router = express.Router();

const { getGraphData } = require("../controllers/dashboardGraph.controller");

router.get("/graph-data", getGraphData);

module.exports = router;