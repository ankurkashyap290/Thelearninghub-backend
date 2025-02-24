const express = require("express");

const Profile = require("../Models/Profile");
const Therapist = require("../Models/Therapist");

//add profile
const addProfile = async (req, res) => {
  try {
    var profileId;

    const profile = await Profile.find();

    if (profile.length > 0) {
      profileId = profile[profile.length - 1].id + 1;
    } else {
      profileId = 1;
    }
    const {
      therapist,
      salary,
      username,
      leave,
      emp_type,
      joining_date,
      attendance,
      personal_information,
    } = req.body;

    const newProfile = new Profile({
      id: profileId,
      therapist,
      emp_type,
      username,
      joining_date,
      photo: req.files.photo[0].filename,
      salary,
      offer_letter: req.files.offer_letter[0].filename,
      adhaar_card: req.files.adhaar_card[0].filename,
      pan_card: req.files.pan_card[0].filename,
      leave,
      attendance,
      personal_information,
    });
    const savedProfile = await newProfile.save();
    res.status(201).send(savedProfile);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All profile
const getAllProfile = async (req, res) => {
  try {
    var data = await Profile.find().populate("salary").populate("therapist").populate("leave").populate("attendance");
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Profile by id--
const getProfileById = async (req, res) => {
  const profile = await Profile.findOne({ id: req.params.id }).populate("salary").populate("therapist").populate("leave").populate("attendance");;
  if (profile) {
    res.status(201).send(profile);
  } else {
    res.status(400).send({ message: "No profile found" });
  }
};

//Delete profile
const deleteProfile = async (req, res) => {
  const profile = await Profile.findOne({ id: req.params.id });
  if (profile) {
    await profile.remove();
    res.status(201).json({ message: "Profile removed" });
  } else {
    res.status(404).json({ message: "Profile is not present" });
  }
};

//Update Profile
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id });

    profile.photo = req.files.photo[0].filename;
    profile.attendance = req.body.attendance;
    profile.username = req.body.username;
    profile.therapist = req.body.therapist;
    profile.salary = req.body.salary;
    profile.adhaar_card = req.files.adhaar_card[0].filename;
    profile.pan_card = req.files.pan_card[0].filename;
    profile.offer_letter = req.files.offer_letter[0].filename;
    profile.leave = req.body.leave;
    profile.emp_type = req.body.emp_type;
    profile.joining_date = req.body.joining_date;
    profile.personal_information = req.body.personal_information;

    //edit therapist from here
    const therapist = await Therapist.findOne({
      _id: profile.therapist.toString(),
    });
    therapist.name = req.body.name;
    therapist.phone = req.body.phone;
    therapist.email = req.body.email;
    await therapist.save();

    await profile.save();
    res.status(201).json({ message: "Profile is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addProfile,
  getAllProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};
