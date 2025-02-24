const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String
    },
    phone: {
        type: String,
    },
    description: {
        type: String,
    },
});
const Enquiry = new mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;
