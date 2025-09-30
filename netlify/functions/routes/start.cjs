require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User=require('../schema/userSchema.cjs');

const app = express.Router();

//environment variables
const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url

app.get("/start", async (req, res) => {
  try {
    const token = req.cookies.hiUser;
    const decoded = jwt.verify(token, secret);
    await mongoose.connect(mongodb_url)
    const usersdata = await User.find({});
    const users = usersdata.filter(f => f.email !== decoded.email).map(a => ({ name: a.name, email: a.email,imageUrl:a.imageUrl }))
    const userdata = usersdata.find(a => a.email === decoded.email);
    const user = { email: userdata.email, name: userdata.name,imageUrl:userdata.imageUrl };
    res.send({ user, users, token })
  } catch (error) { res.status(502).send(error.message); }
})

module.exports = app;