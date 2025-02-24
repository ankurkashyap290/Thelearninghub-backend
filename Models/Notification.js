const mongoose = require("mongoose");

// Create Schema
const NotificationSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  topic: {
    type: String,
  },
  title: {
    type: String,
  },
  data: {
    message: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image:{
    type:String
  }

});

module.exports = Notification = mongoose.model(
  "Notification",
  NotificationSchema
);
