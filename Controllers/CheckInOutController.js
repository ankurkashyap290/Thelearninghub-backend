const express = require("express");
const Therapist = require("../Models/Therapist");
const moment = require("moment");
const CheckInOut = require("../Models/CheckInOut");

//Get All CheckInOut
const getAllCheckInOut = async (req, res) => {
	try {
		var data = await CheckInOut.find().populate("therapist").populate("student");
		res.send({ result: "Done", data: data });
	} catch (error) {
		res.status(500).send({ result: "Fail", message: "Internal server error" });
	}
};

// Get CheckInOut by id--
const getCheckInOutById = async (req, res) => {
	const checkInOut = await CheckInOut.findOne({ id: req.params.id })
		.populate("therapist")
		.populate("student");
	if (checkInOut) {
		res.status(201).send(checkInOut);
	} else {
		res.status(400).send({ message: "No checkInOut found" });
	}
};

//Delete checkInOut
const deleteCheckInOut = async (req, res) => {
	const checkInOut = await CheckInOut.findOne({ id: req.params.id });
	if (checkInOut) {
		await checkInOut.remove();
		res.status(201).json({ message: "CheckInOut removed" });
	} else {
		res.status(404).json({ message: "CheckInOut is not present" });
	}
};

//Checkin-----
const checkIn = async (req, res) => {
	try {
		console.log("***", req);
		var checkinoutId;

		const checkinout = await CheckInOut.find();

		if (checkinout.length > 0) {
			checkinoutId = checkinout[checkinout.length - 1].id + 1;
		} else {
			checkinoutId = 1;
		}
		const { therapist, student } = req.body;

		const newCheckInOut = new CheckInOut({
			id: checkinoutId,
			therapist,
			student,
			active: "online",
			checkIn: req.body.checkIn, //moment().format("hh:mm:ss"),
		});

		const savedCheckInOut = await newCheckInOut.save();

		res.status(201).send(savedCheckInOut);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

//checkout
const checkOut = async (req, res) => {
	try {
		const checkInOut = await CheckInOut.findOne({ id: req.params.id });
		checkInOut.checkOut = moment().format("hh:mm:ss");
		checkInOut.active = "offline";

		//get values
		var valuestart = checkInOut.checkIn;
		var valuestop = moment().format("hh:mm:ss");

		//create date format
		var timeStart = new Date("01/01/2007 " + valuestart).getHours();
		var timeEnd = new Date("01/01/2007 " + valuestop).getHours();

		var timeStartMin = new Date("01/01/2007 " + valuestart).getMinutes();
		var timeEndMin = new Date("01/01/2007 " + valuestop).getMinutes();

		var timeStartSec = new Date("01/01/2007 " + valuestart).getSeconds();
		var timeEndSec = new Date("01/01/2007 " + valuestop).getSeconds();

		var hourDiff = timeEnd - timeStart;
		var minDiff = timeEndMin - timeStartMin;
		var secDiff = timeEndSec - timeStartSec;
		if (hourDiff <= 0) {
			hourDiff = "0" + hourDiff;
		}
		if (minDiff <= 0) {
			minDiff = "0" + minDiff;
		}
		if (timeEndSec < timeStartSec) {
			secDiff = 0 - secDiff;
		}
		if (timeEndMin < timeStartMin) {
			minDiff = 0 - minDiff;
		}

		checkInOut.totalHours = hourDiff + ":" + minDiff + ":" + secDiff;
		await checkInOut.save();
		res.status(200).send(checkInOut);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getAllCheckInOut,
	getCheckInOutById,
	deleteCheckInOut,
	checkIn,
	checkOut,
};
