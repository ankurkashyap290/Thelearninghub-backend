const express = require("express");

const Leave = require("../Models/Leave");
const Therapist = require("../Models/Therapist");

//Add Leave
const addLeave = async (req, res) => {
  try {
    var leaveId;

    const leave = await Leave.find();

    if (leave.length > 0) {
      leaveId = leave[leave.length - 1].id + 1;
    } else {
      leaveId = 1;
    }
    const {
      // therapist,
      // status,
      leave_type,
      start_date,
      end_date,
      // date,
      description,
      student,
    } = req.body;

    const newLeave = new Leave({
      id: leaveId,
      // therapist,
      // status,
      leave_type,
      start_date,
      end_date,
      // date,
      description,
      student,
    });

    const savedLeave = await newLeave.save();

    res.status(201).send(savedLeave);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All leave
const getAllLeave = async (req, res) => {
  try {
    var data = await Leave.find()
    res.status(201).send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Leave by id--
const getLeaveById = async (req, res) => {
  const leave = await Leave.findOne({ id: req.params.id })
  if (leave) {
    res.status(201).send(leave);
  } else {
    res.status(400).send({ message: "No leave found" });
  }
};

//Delete leave
const deleteLeave = async (req, res) => {
  const leave = await Leave.findOne({ id: req.params.id });
  if (leave) {
    await leave.remove();
    res.status(201).json({ message: "Leave removed" });
  } else {
    res.status(404).json({ message: "Leave is not present" });
  }
};

//Update Leave
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({ id: req.params.id });

    // leave.therapist = req.body.therapist;
    // leave.status = req.body.status;
    // leave.date = req.body.date;

    leave.student = req.body.student;
    leave.leave_type = req.body.leave_type;
    leave.end_date = req.body.end_date;
    leave.start_date = req.body.start_date;
    leave.description = req.body.description;

    await leave.save();
    res.status(201).json({ message: "Leave is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Update user leave
const updateUserLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({ id: req.params.id });
    therapist.order = [...therapist.order, req.body.order];
    await user.save();
    res.status(201).json({ message: "User Order is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addLeave,
  getAllLeave,
  getLeaveById,
  updateLeave,
  deleteLeave,
};
