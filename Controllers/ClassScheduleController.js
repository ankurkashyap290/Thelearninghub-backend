const express = require("express");

const ClassSchedule = require("../Models/ClassSchedule");

//Add ClassSchedule
const addClassSchedule = async (req, res) => {
    try {

        var classScheduleId;

        const classSchedule = await ClassSchedule.find()

        if (classSchedule.length > 0) {
            classScheduleId = classSchedule[classSchedule.length - 1].id + 1;
        } else {
            classScheduleId = 1;
        }
        const {
            date,
            student,
            therapist,
            class_time
        } = req.body;

        const newClassSchedule = new ClassSchedule({
            id: classScheduleId,
            date,
            student,
            therapist,
            class_time
        });

        const savedClassSchedule = await newClassSchedule.save();

        res.status(201).send(savedClassSchedule);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

//Get All classSchedule
const getAllClassSchedule = async (req, res) => {
    try {
        var data = await ClassSchedule.find().populate("student").populate("therapist");
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get classSchedule by id--
const getClassScheduleById = async (req, res) => {
    const classSchedule = await ClassSchedule.findOne({ id: req.params.id }).populate("student").populate("therapist");
    if (classSchedule) {
        res.status(201).send(classSchedule);
    } else {
        res.status(400).send({ message: "No classSchedule found" });
    }
};

//Delete classSchedule
const deleteClassSchedule = async (req, res) => {
    const classSchedule = await ClassSchedule.findOne({ id: req.params.id });
    if (classSchedule) {
        await classSchedule.remove();
        res.status(201).json({ message: "ClassSchedule removed" });
    } else {
        res.status(404).json({ message: "ClassSchedule is not present" });
    }
};

//Update ClassSchedule
const updateClassSchedule = async (req, res) => {
    try {
        const classSchedule = await ClassSchedule.findOne({ id: req.params.id });
        classSchedule.date = req.body.date;
        classSchedule.student = req.body.student;
        classSchedule.therapist = req.body.therapist;
        classSchedule.class_time = req.body.class_time;
       
        await classSchedule.save();
        res.status(201).json({ message: "ClassSchedule is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = { addClassSchedule, getAllClassSchedule, getClassScheduleById, updateClassSchedule, deleteClassSchedule }
