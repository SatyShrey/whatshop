require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("Users", userSchema);

app.get('/api', (req, res) => {
  try {
    res.send("✅Server live");
  } catch (error) { console.log(error) }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  await mongoose.connect(mongodb_url);
  const user = await User.findOne({ email });
  if (!user) { return res.send("Invalid credentials") }
  const correctPassword = await bcrypt.compare(password, user.password)
  if (!correctPassword) { return res.send("Invalid credentials") }
  const logUser = { id: user._id, name: user.name, email: user.email }
  const token = jwt.sign(logUser, secret, { expiresIn: "30d" })

  res.cookie("hiUser", token, {
    httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000
  })
  res.send({ email: user.email, name: user.name });
})

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  mongoose.connect(mongodb_url)
  const user = await User.findOne({ email });
  if (user) { return res.send("User already exists") }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newData = { name, email, password: hashedPassword }
  User.create(newData);
  res.send("Signup success")
})

//**start app**/
app.get("/api/start", async (req, res) => {
  try{
    const token = req.cookies.hiUser;
  const decoded = jwt.verify(token, secret);
  const user = decoded;
  mongoose.connect(mongodb_url)
  const users=await User.find({email:{$ne:user.email}});
  users.forEach(a=>a.password='1')
  res.send({user,users})
  }catch(error){res.end()}
})

//logout
app.get("/api/logout",(req,res)=>{
  try{
    res.clearCookie("hiUser");
    res.send('Logged out')
  }catch(error){res.end()}
})




exports.handler = serverless(app);