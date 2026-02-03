require("dotenv").config();
const express = require("express");

const healthRoutes = require("./routes/health.routes");

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true});
});
module.exports = app;