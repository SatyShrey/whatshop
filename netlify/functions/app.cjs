const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const startRoute=require('./routes/start.cjs');
const loginRoute=require('./routes/login.cjs')
const signupRoute=require('./routes/signup.cjs');
const logoutRoute=require('./routes/logout.cjs')
const updatePicRoute=require('./routes/uploadpic.cjs');
const updateNameRoute=require('./routes/updatename.cjs')

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//default page
app.get('/api', (req, res) => { res.send("✅Server live"); })

//routes
app.use('/api',startRoute);
app.use('/api',loginRoute);
app.use('/api',logoutRoute);
app.use('/api',signupRoute);
app.use('/api',updateNameRoute);
app.use('/api',updatePicRoute);


exports.handler = serverless(app);