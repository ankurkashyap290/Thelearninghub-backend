const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String
    },
    address: {
        type:String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
});
const Contact = new mongoose.model("Contact", ContactSchema);
module.exports = Contact;
