const express = require("express");

const FinancialRecordController = require("../Controllers/FinancialRecordController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const storage = multer.diskStorage({
  destination: "Images/Transaction",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("transaction_proof");

router.post(
  "/addfinancialrecord",
  upload,
  FinancialRecordController.addFinancialRecord
);
router.get(
  "/getallfinancialrecord",
  FinancialRecordController.getAllFinancialRecord
);
router.get(
  "/getfinancialrecordbyid/:id",
  FinancialRecordController.getFinancialRecordById
);
router.put(
  "/updatefinancialrecord/:id",
  upload,
  FinancialRecordController.updateFinancialRecord
);
router.delete(
  "/deletefinancialrecord/:id",
  FinancialRecordController.deleteFinancialRecord
);

module.exports = router;
