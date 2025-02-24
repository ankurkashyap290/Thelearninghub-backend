const express = require("express");

const Enquiry = require("../Models/Enquiry");
const Therapist = require("../Models/Therapist");

//Add Enquiry
const addEnquiry = async (req, res) => {
  try {
    var enquiryId;

    const enquiry = await Enquiry.find();

    if (enquiry.length > 0) {
      enquiryId = enquiry[enquiry.length - 1].id + 1;
    } else {
      enquiryId = 1;
    }
    const { name, phone, description } = req.body;

    const newEnquiry = new Enquiry({
      id: enquiryId,
      name,
      phone,
      description,
    });

    const savedEnquiry = await newEnquiry.save();

    res.status(201).send(savedEnquiry);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All enquiry
const getAllEnquiry = async (req, res) => {
  try {
    var data = await Enquiry.find();
    res.status(201).send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Enquiry by id--
const getEnquiryById = async (req, res) => {
  const enquiry = await Enquiry.findOne({ id: req.params.id });
  if (enquiry) {
    res.status(201).send(enquiry);
  } else {
    res.status(400).send({ message: "No enquiry found" });
  }
};

//Delete enquiry
const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findOne({ id: req.params.id });
  if (enquiry) {
    await enquiry.remove();
    res.status(201).json({ message: "Enquiry removed" });
  } else {
    res.status(404).json({ message: "Enquiry is not present" });
  }
};

//Update Enquiry
const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findOne({ id: req.params.id });
    enquiry.name = req.body.name;
    enquiry.phone = req.body.phone;
    enquiry.description = req.body.description;

    await enquiry.save();
    res.status(201).json({ message: "Enquiry is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addEnquiry,
  getAllEnquiry,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
