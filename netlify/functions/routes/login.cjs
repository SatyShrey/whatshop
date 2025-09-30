require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../schema/userSchema.cjs');

const app = express.Router();

//environment variables
const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url;

app.post('/login', async (req, res) => {
    try {
        const { email, otp } = req.body;
        await mongoose.connect(mongodb_url);
        const current = parseInt(Date.now());
        const user = await User.findOne({ email, otp });
        if (!user) { return res.status(502).send("Invalid otp") }
        const id = parseInt(user.id);
        if ((current - id) > 300000) { return res.status(502).send("expired otp") }
        const fakeotp = Math.floor(1000 + Math.random() * 9000).toString();
        await User.updateOne({ email }, { otp: fakeotp })
        const token = jwt.sign(user.toObject(), secret, { expiresIn: "30d" })
        res.cookie("hiUser", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        })
        res.send({ email: user.email, name: user.name, imageUrl: user.imageUrl });
    } catch (error) { res.status(502).send(error.message); }
})

module.exports = app;