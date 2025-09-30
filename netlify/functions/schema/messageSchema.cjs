const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  receiver: String,
  sender: String,
  time: String,
});
const Message = mongoose.models.Messages || mongoose.model('Messages', messageSchema);

module.exports=Message;