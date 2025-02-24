const express = require("express");

const ClassScheduleController = require("../Controllers/ClassScheduleController");

const multer = require("multer");

const router = express.Router();

const upload = multer().array();

router.post("/addclassschedule", upload, ClassScheduleController.addClassSchedule);
router.get("/getallclassschedule", ClassScheduleController.getAllClassSchedule);
router.get("/getclassschedulebyid/:id", ClassScheduleController.getClassScheduleById);
router.put("/updateclassschedule/:id", upload, ClassScheduleController.updateClassSchedule);
router.delete("/deleteclassschedule/:id", ClassScheduleController.deleteClassSchedule);

module.exports = router;
