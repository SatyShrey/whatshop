require("dotenv").config();
const express = require("express");

const app = express.Router();

app.get("/logout", (req, res) => {
  res.clearCookie("hiUser");
  res.send('Logged out');
})

module.exports = app;