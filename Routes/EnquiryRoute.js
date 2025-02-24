const express = require("express");

const EnquiryController = require("../Controllers/EnquiryController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const upload = multer().array();


router.post("/addenquiry", upload, EnquiryController.addEnquiry);
router.get("/getallenquiry", EnquiryController.getAllEnquiry);
router.get("/getenquirybyid/:id", EnquiryController.getEnquiryById);
router.put("/updateenquiry/:id", upload, EnquiryController.updateEnquiry);
router.delete("/deleteenquiry/:id", EnquiryController.deleteEnquiry);

module.exports = router;
