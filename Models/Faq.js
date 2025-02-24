const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    question: {
        type: String
    },
    answer: {
      type:String
    },
    description: {
        type: String,
    },
});
const Faq = new mongoose.model("Faq", FaqSchema);
module.exports = Faq;
