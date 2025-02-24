const express = require("express");

const Group = require("../Models/Group");
// const Therapist = require("../Models/Therapist");

//Add Group
const addGroup = async (req, res) => {
    try {

        var groupId;

        const group = await Group.find()

        if (group.length > 0) {
            groupId = group[group.length - 1].id + 1;
        } else {
            groupId = 1;
        }
        const {
            
            students,
            therapist
        } = req.body;

        const newGroup = new Group({
            id: groupId,
           
            students,
            therapist
        });

        const savedGroup = await newGroup.save();

        res.status(201).send(savedGroup);
    } catch (e) {
        res.status(500).send(e.message);
    }
};



//Get All Group
const getAllGroup = async (req, res) => {
    try {
        var data = await Group.find().populate("students").populate("therapist");
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get Group by id--
const getGroupById = async (req, res) => {
    const group = await Group.findOne({ id: req.params.id });
    if (group) {
        res.status(201).send(group);
    } else {
        res.status(400).send({ message: "No group found" });
    }
};

//Delete group
const deleteGroup = async (req, res) => {
    const group = await Group.findOne({ id: req.params.id });
    if (group) {
        await group.remove();
        res.status(201).json({ message: "Group removed" });
    } else {
        res.status(404).json({ message: "Group is not present" });
    }
};

//Update Group
const updateGroup = async (req, res) => {
    try {
        const group = await Group.findOne({ id: req.params.id });
        group.students = req.body.students;
        group.therapist = req.body.therapist;
       
        await group.save();
        res.status(201).json({ message: "Group is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = { addGroup, getAllGroup, getGroupById, updateGroup, deleteGroup }