const mongoose = require("mongoose");

// Create Schema
const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  code: {
    type: String,
    unique: true,
  },
  expireIn: {
    type: String,
  },
});

module.exports = Otp = mongoose.model("Otp", OtpSchema);
