const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
const isMobilePhone = require("validator/lib/isMobilePhone");

const AdminSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail, "invalid email"],
  },
  phone: {
    type: Number,
    required: true,
    // validate: [isMobilePhone, "invalid phone number"],
  },
  password: {
    type: String,
    // validate: [isStrongPassword, "Please enter strong password"],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
const Admin = new mongoose.model("Admin", AdminSchema);
module.exports = Admin;
