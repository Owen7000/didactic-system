const express = require("express");
const router = express.Router();

const { attemptLogin } = require("../controllers/login.controller");

router.post("/login", attemptLogin);

module.exports = router;