require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: String,
    receiver: String,
    sender: String,
    time: String,
});
const Message = mongoose.models.Messages || mongoose.model('Messages', messageSchema);

const app = express.Router();

//environment variables
const secret = process.env.secret;
const mongodb_url = process.env.mongodb_url

app.post('/chats', async (req, res) => {
    try {
        const { sender,receiver } = req.body
        const token = req.cookies.hiUser;
        const decoded = jwt.verify(token, secret);
        const user = decoded;
        await mongoose.connect(mongodb_url)
        const messages=await Message.find({
            // $and: [
            //     { receiver:receiver,sender:sender },
            //     { receiver:sender,sender:receiver }
            // ]
        });

        res.send(messages);
    } catch (err) { res.status(502).send(err.message) }
});

module.exports = app;