const express = require("express");
const router = express.Router();

const { getNotifications } = require("../controllers/getNotifications.controller");

router.post("/notifications", getNotifications);

module.exports = router;