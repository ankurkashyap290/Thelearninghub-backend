const mongoose = require("mongoose");
const moment = require("moment");

const VaultSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
    default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});
const Vault = new mongoose.model("Vault", VaultSchema);
module.exports = Vault;
