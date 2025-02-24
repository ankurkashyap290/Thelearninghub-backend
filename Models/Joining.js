const mongoose = require("mongoose");

const JoiningSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  resume: {
    type: String,
  },
});
const Joining = new mongoose.model("Joining", JoiningSchema);
module.exports = Joining;
