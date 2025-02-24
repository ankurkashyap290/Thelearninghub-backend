const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
  },
});
const Group = new mongoose.model("Group", GroupSchema);
module.exports = Group;
