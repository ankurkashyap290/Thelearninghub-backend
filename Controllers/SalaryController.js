const express = require("express");

const Salary = require("../Models/Salary");

//Add Salary
const addSalary = async (req, res) => {
  try {
    var salaryId;

    const salary = await Salary.find();

    if (salary.length > 0) {
      salaryId = salary[salary.length - 1].id + 1;
    } else {
      salaryId = 1;
    }
    const { therapist, amount, date, time } = req.body;

    const newSalary = new Salary({
      id: salaryId,
      therapist,
      date,
      time,
      payment_slip:req.files[0].filename,
      amount

    });

    const savedSalary = await newSalary.save();

    res.status(201).send(savedSalary);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All Salary
const getAllSalary = async (req, res) => {
  try {
    var data = await Salary.find()
      .populate("therapist")
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};

// Get Salary by id--
const getSalaryById = async (req, res) => {
  const salary = await Salary.findOne({ id: req.params.id })
    .populate("therapist")
   
  if (salary) {
    res.status(201).send(salary);
  } else {
    res.status(400).send({ message: "No salary found" });
  }
};

//Delete salary
const deleteSalary = async (req, res) => {
  const salary = await Salary.findOne({ id: req.params.id });
  if (salary) {
    await salary.remove();
    res.status(201).json({ message: "Salary removed" });
  } else {
    res.status(404).json({ message: "Salary is not present" });
  }
};

//Update Salary
const updateSalary = async (req, res) => {
  try {
    const salary = await Salary.findOne({ id: req.params.id });
    salary.therapist = req.body.therapist;
    salary.time = req.body.time;
    salary.date = req.body.date;
    salary.amount = req.body.amount;
    salary.payment_slip = req.files[0].filename;

    await salary.save();
    res.status(201).json({ message: "Salary is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addSalary,
  getAllSalary,
  getSalaryById,
  updateSalary,
  deleteSalary,
};
