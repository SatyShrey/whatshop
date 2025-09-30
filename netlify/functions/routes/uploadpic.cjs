require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const User=require('../schema/userSchema.cjs');

const app = express.Router();

//environment variables
const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

//upload pic
app.post('/upload', upload.single('profile'), async (req, res) => {
  try {
    const token = req.cookies.hiUser;
    const decoded = jwt.verify(token, secret);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pics',public_id:decoded.email,
      transformation: [{ width: 300, height: 300, crop: 'limit' }],
    });
    // Optional: delete local file after upload
    fs.unlinkSync(req.file.path);
    await mongoose.connect(mongodb_url)
    await User.findOneAndUpdate({ email: decoded.email }, { imageUrl:result.secure_url })
    res.send(result.secure_url);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;