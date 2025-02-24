const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  status:{
    type: String,
    enum: ["present","absent"],
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  class_type: {
    type: String,
    enum: ["online","offline"],
  },
  date:{
    type:String
  }
   
 
});

const Attendance = new mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
