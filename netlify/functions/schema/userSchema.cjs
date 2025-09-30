const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  otp: String,
  id: String,
  imageUrl: String,
});
const User = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports=User;