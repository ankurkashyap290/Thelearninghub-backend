const express = require("express");

const CheckInOutController = require("../Controllers/CheckInOutController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const upload = multer().array();

router.get("/getallcheckinout", CheckInOutController.getAllCheckInOut);
router.get("/getcheckinoutbyid/:id", CheckInOutController.getCheckInOutById);

router.delete("/deletecheckinout/:id", CheckInOutController.deleteCheckInOut);
router.post("/checkin",upload, CheckInOutController.checkIn);
router.get("/checkout/:id", CheckInOutController.checkOut);

module.exports = router;
