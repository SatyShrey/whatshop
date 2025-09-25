require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url
const pass = process.env.pass

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  otp: String,
  id: String,
});
const User = mongoose.model("Users", userSchema);

//default page
app.get('/api', (req, res) => { res.send("✅Server live"); })

//login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, otp } = req.body;
    await mongoose.connect(mongodb_url);
    const current = parseInt(Date.now());
    const user = await User.findOne({ email, otp });
    if (!user) { return res.status(502).send("Invalid otp") }
    const id = parseInt(user.id);
    if ((current - id) > 300000) { return res.status(502).send("expired otp") }
    const fakeotp = Math.floor(1000 + Math.random() * 9000).toString();
    await User.updateOne({email},{otp:fakeotp})
    const token = jwt.sign(user.toObject(), secret, { expiresIn: "30d" })
    res.cookie("hiUser", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    res.send({ email: user.email, name: user.name });
  } catch (error) { res.status(502).send(error.message);console.log(error.message) }
})

const transporter = nodemailer.createTransport(
  {
    secure: true, host: "smtp.gmail.com", port: 465,
    auth: { user: "satyaxyz31@gmail.com", pass: pass }
  }
)
//signup
app.post('/api/signup', async (req, res) => {
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
    console.log(error)
    res.status(502).send(error.message);
  }
});

//**start app**/
app.get("/api/start", async (req, res) => {
  try {
    const token = req.cookies.hiUser;
    const decoded = jwt.verify(token, secret);
    const user = decoded;
    await mongoose.connect(mongodb_url)
    const usersdata = await User.find({ email: { $ne: user.email } });
    const users=usersdata.map(a=>({name:a.name,email:a.email}))
    res.send({user,users})
  } catch (error) { res.status(502).send(error);console.log(error.message) }
})

//logout
app.get("/api/logout", (req, res) => {
  res.clearCookie("hiUser");
  res.send('Logged out');
})

exports.handler = serverless(app);