const express = require("express");

const TimeTable = require("../Models/TimeTable");

//create
exports.createTimeTable = async (req, res) => {
  try {
    var id;

    const timeTable = await TimeTable.find();

    if (timeTable.length > 0) {
      id = timeTable[timeTable.length - 1].id + 1;
    } else {
      id = 1;
    }
    const { date, time, student, therapist } = req.body;
    const newTimeTable = new TimeTable({
      id: id,
      date,
      time,
      student,
      therapist,
    });
    const savedTimeTable = await newTimeTable.save();
    res.status(201).send(savedTimeTable);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
//Get All Timetables
exports.getAllTimeTables = async (req, res) => {
  try {
    var data = await TimeTable.find().populate("student");
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Timetable by id--
exports.getTimeTableById = async (req, res) => {
  const timetable = await TimeTable.findOne({ id: req.params.id }).populate(
    "student"
  );
  if (timetable) {
    res.status(201).send(timetable);
  } else {
    res.status(400).send({ message: "No Timetable found" });
  }
};
//Delete timetable
exports.deleteTimeTable = async (req, res) => {
  const timetable = await TimeTable.findOne({ id: req.params.id });
  if (timetable) {
    await timetable.remove();
    res.status(201).json({ message: "Timetable removed" });
  } else {
    res.status(404).json({ message: "Timetable is not present" });
  }
};

//Update Timetable
exports.updateTimeTable = async (req, res) => {
  try {
    const timeTable = await TimeTable.findOne({ id: req.params.id });
    timeTable.date = req.body.date;
    timeTable.time = req.body.time;
    timeTable.student = req.body.student;
    timeTable.therapist = req.body.therapist;

    await timeTable.save();
    res.status(201).json({ message: "TimeTable is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Timetable approvable
exports.timeTableApproval = async (req, res) => {
  const timetable = await TimeTable.findOne({ id: req.params.id });
  timetable.status = req.body.status;
  await timetable.save();
  res.status(200).json({ message: timetable });
};
