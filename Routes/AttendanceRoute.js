const express = require("express");

const AttendanceController = require("../Controllers/AttendanceController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const upload = multer().array();

router.post("/addattendance", upload, AttendanceController.addAttendance);
router.get("/getallattendance", AttendanceController.getAllAttendance);
router.get("/getattendancebyid/:id", AttendanceController.getAttendanceById);
router.put(
  "/updateattendance/:id",
  upload,
  AttendanceController.updateAttendance
);
router.delete("/deleteattendance/:id", AttendanceController.deleteAttendance);


module.exports = router;
