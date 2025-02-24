const express = require("express");

const Attendance = require("../Models/Attendance");
const Therapist = require("../Models/Therapist");

const moment = require("moment");

//Add Attendance
const addAttendance = async (req, res) => {
  try {
    var attendanceId;

    const attendance = await Attendance.find();

    if (attendance.length > 0) {
      attendanceId = attendance[attendance.length - 1].id + 1;
    } else {
      attendanceId = 1;
    }
    const { therapist, student, class_type, date,status} = req.body;

    const newAttendance = new Attendance({
      id: attendanceId,
      therapist,
      student,
      class_type,
      date,
      status
    });

    const savedAttendance = await newAttendance.save();

    res.status(201).send(savedAttendance);
  } catch (e) {
    res.status(500).send(e.message);
  }
};


//Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    var data = await Attendance.find()
      .populate("therapist")
      .populate("student");
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};

// Get Attendance by id--
const getAttendanceById = async (req, res) => {
  const attendance = await Attendance.findOne({ id: req.params.id })
    .populate("therapist")
    .populate("student");
  if (attendance) {
    res.status(201).send(attendance);
  } else {
    res.status(400).send({ message: "No attendance found" });
  }
};

//Delete attendance
const deleteAttendance = async (req, res) => {
  const attendance = await Attendance.findOne({ id: req.params.id });
  if (attendance) {
    await attendance.remove();
    res.status(201).json({ message: "Attendance removed" });
  } else {
    res.status(404).json({ message: "Attendance is not present" });
  }
};

//Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ id: req.params.id });
    attendance.therapist = req.body.therapist;
    attendance.date = req.body.date;
    attendance.class_type = req.body.class_type;
    attendance.student = req.body.student;
    attendance.status = req.body.status;

    await attendance.save();
    res.status(201).json({ message: "Attendance is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,

};
