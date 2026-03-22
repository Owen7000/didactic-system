const express = require("express");
const router = express.Router();

const { getClinicianPatientGraph } = require("../controllers/getClinicianPatientGraph.controller");

router.post("/clinician/patient/graph", getClinicianPatientGraph);

module.exports = router;