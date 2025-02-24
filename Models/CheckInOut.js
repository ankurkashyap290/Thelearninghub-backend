const mongoose = require("mongoose");

const CheckInOutSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  totalHours: {
    type: String,
    default: "",
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: String,
    default: "offline",
  },
});

const CheckInOut = new mongoose.model("CheckInOut", CheckInOutSchema);
module.exports = CheckInOut;
