const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  // therapist: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Therapist",
  // },
  // date: {
  //   type: String,
  // },
  // student: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Student",
  // },
  // status: {
  //   type: String,
  //   enum: ["approved", "unapproved"],
  // },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  leave_type: {
    type: String,
  },
});

const Leave = new mongoose.model("Leave", LeaveSchema);
module.exports = Leave;
