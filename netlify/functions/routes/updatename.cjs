require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User=require('../schema/userSchema.cjs');

const app = express.Router();

//environment variables
const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url

app.put('/edit-name', async (req, res) => {
  try {
    const { name } = req.body
    const token = req.cookies.hiUser;
    const decoded = jwt.verify(token, secret);
    const user = decoded;
    await mongoose.connect(mongodb_url)
    await User.findOneAndUpdate({ email: user.email }, { name: name })
    res.send('Name updated successfully');
  } catch (err) { res.status(502).send(err.message) }
});

module.exports = app;