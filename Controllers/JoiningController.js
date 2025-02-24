const express = require("express");

const Joining = require("../Models/Joining");

//Add Joining
const addJoining = async (req, res) => {
    try {

        var joiningId;

        const joining = await Joining.find()

        if (joining.length > 0) {
            joiningId = joining[joining.length - 1].id + 1;
        } else {
            joiningId = 1;
        }
        const {
            
            name,
            email
        } = req.body;

        const newJoining = new Joining({
            id: joiningId,
           
            name,
            email,
            resume:req.files[0].filename
        });

        const savedJoining = await newJoining.save();

        res.status(201).send(savedJoining);
    } catch (e) {
        res.status(500).send(e.message);
    }
};



//Get All Joining
const getAllJoining = async (req, res) => {
    try {
        var data = await Joining.find();
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get Joining by id--
const getJoiningById = async (req, res) => {
    const joining = await Joining.findOne({ id: req.params.id });
    if (joining) {
        res.status(201).send(joining);
    } else {
        res.status(400).send({ message: "No joining found" });
    }
};

//Delete joining
const deleteJoining = async (req, res) => {
    const joining = await Joining.findOne({ id: req.params.id });
    if (joining) {
        await joining.remove();
        res.status(201).json({ message: "Joining removed" });
    } else {
        res.status(404).json({ message: "Joining is not present" });
    }
};

//Update Joining
const updateJoining = async (req, res) => {
    try {
        const joining = await Joining.findOne({ id: req.params.id });
        joining.name = req.body.name;
        joining.email = req.body.email;
        joining.resume = req.files[0].filename;
       
        await joining.save();
        res.status(201).json({ message: "Joining is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = { addJoining, getAllJoining, getJoiningById, updateJoining, deleteJoining }