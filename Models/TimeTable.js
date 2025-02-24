const mongoose = require("mongoose");
const TimeTableSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["approved", "unapproved"],
  },
  time: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
});
const TimeTable = new mongoose.model("TimeTable", TimeTableSchema);
module.exports = TimeTable;
