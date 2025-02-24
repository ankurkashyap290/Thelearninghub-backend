const express = require("express");
const Stripe = require("stripe")(
  "sk_test_51MgPZLSDHq7fwvzHzuz0m8Hryq4jC53Svtn8ldyQHU98aUrvwvNcgG36MCsgY13SHqsRdgbRkkO4KYkGlo4uf6fx00DmlhwXCM"
);
const multer = require("multer");
const Payment = require("../Models/Payment");

const router = express.Router();

const app = express();
app.use(express.json());
const upload = multer().array();

router.post("/addpayment", upload, async (req, res) => {
  var paymentInfoId;

  const payment = await Payment.find();

  if (payment.length > 0) {
    paymentInfoId = payment[payment.length - 1].id + 1;
  } else {
    paymentInfoId = 1;
  }

  const token = await Stripe.tokens.create({
    card: {
      number: req.body.number,
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      cvc: req.body.cvc,
    },
  });

  const customer = await Stripe.customers.create({
    email: req.body.email,
    source: token.id,
    name: req.body.name,
  });

  try {
    const { amount, currency, description } = req.body;
    const paymentIntent = await Stripe.paymentIntents.create({
      amount,
      currency,
      description,
    });
    const PaymentInfo = new Payment({
      id: paymentInfoId,
      student: req.body.student,
      paymentIntent,
    });
    const savedPayment = await PaymentInfo.save();

    res.status(200).send({
      message: "Charge processed successfully",
      savedPayment,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//Get All Payment
router.get("/getallpayment", async (req, res) => {
  try {
    var data = await Payment.find().populate("student");
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
});

// Get Payment by id--
router.get("/getpaymentbyid/:id", async (req, res) => {
  const payment = await Payment.findOne({ id: req.params.id }).populate(
    "student"
  );
  if (payment) {
    res.status(201).send(payment);
  } else {
    res.status(400).send({ message: "No payment found" });
  }
});

module.exports = router;
