const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    date:{
        type:Date,
        default:Date.now
    },
    paymentIntent:{
        type:Object
    }
});
const Payment = new mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
