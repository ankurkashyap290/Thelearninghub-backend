const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
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
  description: {
    type: String,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  classLeft: {
    type: Number,
  },
  start_date:{
    type:String
  },
  end_date:{
    type:String
  },
  time:{
    type:String
  },
  
 
});
const Report = new mongoose.model("Report", ReportSchema);
module.exports = Report;
