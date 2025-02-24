const express = require("express");

const FinancialRecord = require("../Models/FinancialRecord");

//Add FinancialRecord
const addFinancialRecord = async (req, res) => {
    try {

        var financialRecordId;

        const financialRecord = await FinancialRecord.find()

        if (financialRecord.length > 0) {
            financialRecordId = financialRecord[financialRecord.length - 1].id + 1;
        } else {
            financialRecordId = 1;
        }
        const {
            student,
            therapist,
            amount,
            date,time
        } = req.body;

        const newFinancialRecord = new FinancialRecord({
            id: financialRecordId,
            transaction_proof:req.files[0].filename,
            student,
           therapist,
           date,time,
           amount
        });

        const savedFinancialRecord = await newFinancialRecord.save();

        res.status(201).send(savedFinancialRecord);
    } catch (e) {
        res.status(500).send(e.message);
    }
};



//Get All FinancialRecord
const getAllFinancialRecord = async (req, res) => {
    try {
        var data = await FinancialRecord.find().populate("student").populate("therapist");
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get FinancialRecord by id--
const getFinancialRecordById = async (req, res) => {
    const financialRecord = await FinancialRecord.findOne({ id: req.params.id }).populate("student").populate("therapist");
    if (financialRecord) {
        res.status(201).send(financialRecord);
    } else {
        res.status(400).send({ message: "No financialRecord found" });
    }
};

//Delete financialRecord
const deleteFinancialRecord = async (req, res) => {
    const financialRecord = await FinancialRecord.findOne({ id: req.params.id });
    if (financialRecord) {
        await financialRecord.remove();
        res.status(201).json({ message: "financialRecord removed" });
    } else {
        res.status(404).json({ message: "financialRecord is not present" });
    }
};

//Update financialRecord
const updateFinancialRecord = async (req, res) => {
    try {
        const financialRecord = await FinancialRecord.findOne({ id: req.params.id });
        financialRecord.transaction_proof= req.files[0].filename;
        financialRecord.student = req.body.student;
        financialRecord.therapist = req.body.therapist;
        financialRecord.amount = req.body.amount;
        financialRecord.date = req.body.date;
        financialRecord.time = req.body.time;
       
        await financialRecord.save();
        res.status(201).json({ message: "FinancialRecord is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = { addFinancialRecord, getAllFinancialRecord, getFinancialRecordById, updateFinancialRecord, deleteFinancialRecord }