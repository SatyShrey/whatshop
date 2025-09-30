require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User=require('../schema/userSchema.cjs');

const app = express.Router();

//environment variables
const mongodb_url = process.env.mongodb_url
const pass = process.env.pass

const transporter = nodemailer.createTransport(
  {
    secure: true, host: "smtp.gmail.com", port: 465,
    auth: { user: "satyaxyz31@gmail.com", pass: pass }
  }
);

app.post('/signup', async (req, res) => {
  try {
    const { name, email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const newData = { name, email, otp, id: Date.now() }
    await mongoose.connect(mongodb_url)
    await User.findOneAndUpdate({ email }, newData, { upsert: true, setDefaultsOnInsert: true });
    const result = await transporter.sendMail(
      {
        to: email,
        subject: "OTP",
        html: `<div style="text-align: center;">
         Your OTP is
         <div style="color: orangered;font-size: 30px;font-weight: bold;">${otp}</div>
         Valid for 5 minutes.
        </div>`
      })
    res.send(`OTP sent to email address`);
  } catch (error) {
    res.status(502).send(error.message);
  }
});

module.exports = app;