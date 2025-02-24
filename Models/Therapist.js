const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const TherapistSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

const Therapist = new mongoose.model("Therapist", TherapistSchema);
module.exports = Therapist;
