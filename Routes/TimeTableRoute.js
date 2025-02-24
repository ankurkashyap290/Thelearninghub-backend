const express = require("express");

const TimeTableController = require("../Controllers/TimeTableController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const jwt = require("jsonwebtoken");

const upload = multer().array();

router.post("/createTimeTable", upload, TimeTableController.createTimeTable);
router.get("/getAllTimeTables", TimeTableController.getAllTimeTables);
router.get("/getTimeTableById/:id", TimeTableController.getTimeTableById);
router.put("/updateTimeTable/:id", upload, TimeTableController.updateTimeTable);
router.delete("/deleteTimeTable/:id", TimeTableController.deleteTimeTable);
router.put(
  "/timetableapproval/:id",
  upload,
  TimeTableController.timeTableApproval
);

module.exports = router;
