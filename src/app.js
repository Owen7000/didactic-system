require("dotenv").config();
const express = require("express");

const loginRoutes = require("./routes/login.routes");

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true});
});

app.use("/api/", loginRoutes);

module.exports = app;