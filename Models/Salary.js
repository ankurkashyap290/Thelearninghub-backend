const mongoose = require("mongoose");
const SalarySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  payment_slip: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  amount:{
    type:String
  }
});
const Salary = new mongoose.model("Salary", SalarySchema);
module.exports = Salary;
