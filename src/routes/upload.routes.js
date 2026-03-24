const express = require("express");
const router = express.Router();

const { uploadData } = require("../controllers/upload.controller");

router.post("/upload", uploadData);

module.exports = router;