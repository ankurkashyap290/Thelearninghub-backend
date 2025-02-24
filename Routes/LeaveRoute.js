const express = require("express");

const LeaveController = require("../Controllers/LeaveController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const upload = multer().array();


router.post("/addleave", upload, LeaveController.addLeave);
router.get("/getallleave", LeaveController.getAllLeave);
router.get("/getleavebyid/:id", LeaveController.getLeaveById);
router.put("/updateleave/:id", upload, LeaveController.updateLeave);
router.delete("/deleteleave/:id", LeaveController.deleteLeave);

module.exports = router;
