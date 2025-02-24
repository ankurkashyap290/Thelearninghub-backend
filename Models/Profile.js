const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id: {
    type: Number,
  },

  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  username: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  salary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salary",
  },
  offer_letter: {
    type: String,
    required: true,
  },
  adhaar_card: {
    type: String,
    required: true,
  },
  pan_card: {
    type: String,
    required: true,
  },
  joining_date: {
    type: String,
  },
  emp_type: {
    type: String,
  },
  leave: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leave",
    },
  ],
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],
  personal_information: [
    {
      country: String,
      city: String,
      state: String,
      pin: String,
     address:String,
      role: String,
      shift: String,
    },
  ],
});
const Profile = new mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
