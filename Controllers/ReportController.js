const express = require("express");

const Report = require("../Models/Report");
const Student = require("../Models/Student");

//Add Report
const addReport = async (req, res) => {
  try {
    var ReportId;

    const report = await Report.find();

    if (report.length > 0) {
      ReportId = report[report.length - 1].id + 1;
    } else {
      ReportId = 1;
    }
    const {
      therapist,
      student,
      description,
      classLeft,
      rating,
      start_date,
      end_date,
      time,
    } = req.body;

    const newReport = new Report({
      id: ReportId,
      therapist,
      student,
      description,
      classLeft,
      rating,
      start_date,
      end_date,
      time,
    });

    const savedReport = await newReport.save();

    res.status(201).send(savedReport);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All Report
const getAllReport = async (req, res) => {
  try {
    var data = await Report.find()
      .populate("therapist")
      .populate("student")
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};

// Get Report by id--
const getReportById = async (req, res) => {
  const report = await Report.findOne({ id: req.params.id })
    .populate("therapist")
    .populate("student")
  if (report) {
    res.status(201).send(report);
  } else {
    res.status(400).send({ message: "No report found" });
  }
};

//Delete report
const deleteReport = async (req, res) => {
  const report = await Report.findOne({ id: req.params.id });
  if (report) {
    await report.remove();
    res.status(201).json({ message: "Report removed" });
  } else {
    res.status(404).json({ message: "Report is not present" });
  }
};

//Update Report
const updateReport = async (req, res) => {
  try {
    const report = await Report.findOne({ id: req.params.id });
    report.therapist = req.body.therapist;
    report.student = req.body.student;
    report.description = req.body.description;
    report.classLeft = req.body.classLeft;
    report.rating = req.body.rating;
    report.start_date = req.body.start_date;
    report.end_date = req.body.end_date;
    report.time = req.body.time;

    await report.save();
    res.status(201).json({ message: "Report is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//get reports by student
const getReportByStudent = async (req, res) => {
  const student = await Student.findOne({ id: req.params.id });
  const report = await Report.find({ student: student._id })
    .populate("therapist")
    .populate("student");
  if (report) {
    res.status(201).send(report);
  } else {
    res.status(400).send({ message: "No report found" });
  }
};

module.exports = {
  addReport,
  getAllReport,
  getReportById,
  updateReport,
  deleteReport,
  getReportByStudent,
};
