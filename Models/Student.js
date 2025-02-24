const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  // therapist: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Therapist",
  //   },
  // ],
  gender: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
  },
  // class_left: {
  //   type: Number,
  // },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  pin: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  mother_name: {
    type: String,
  },
  father_name: {
    type: String,
  },
  parent_email: {
    type: String,
  },
  parent_phone: {
    type: String,
  },
  parent_adhaar: {
    type: String,
  },
  parent_pan: {
    type: String,
  },
  parent_photo: {
    type: String,
  },
  image: {
    type: String,
  },
  student_adhaar: {
    type: String,
  },
  student_report: {
    type: String,
  },
  // student_admission: {
  //   type: String,
  // },
  // attendance: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Attendance",
  // },
});
const Student = new mongoose.model("Student", StudentSchema);
module.exports = Student;
