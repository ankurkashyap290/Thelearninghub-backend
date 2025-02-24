const mongoose = require("mongoose");

const FinancialRecordSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  transaction_proof: {
    type: String,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  date: {
    type: String,
  },
  time:{
    type: String,

  },
  amount: {
    type: Number,
  },
});
const FinancialRecord = new mongoose.model("FinancialRecord", FinancialRecordSchema);
module.exports = FinancialRecord;
