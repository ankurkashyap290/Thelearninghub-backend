const express = require("express");

const Faq = require("../Models/Faq");

//Add Faq
const addFaq = async (req, res) => {
    try {

        var faqId;

        const faq = await Faq.find()

        if (faq.length > 0) {
            faqId = faq[faq.length - 1].id + 1;
        } else {
            faqId = 1;
        }
        const {
            question,
            answer,
            description,
        } = req.body;

        const newFaq = new Faq({
            id: faqId,
            question,
            answer,
            description,
        });

        const savedFaq = await newFaq.save();

        res.status(201).send(savedFaq);
    } catch (e) {
        res.status(500).send(e.message);
    }
};

//Get All Faq
const getAllFaq = async (req, res) => {
    try {
        var data = await Faq.find();
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get Faq by id--
const getFaqById = async (req, res) => {
    const faq = await Faq.findOne({ id: req.params.id });
    if (faq) {
        res.status(201).send(faq);
    } else {
        res.status(400).send({ message: "No faq found" });
    }
};


//Update Faq
const updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findOne({ id: req.params.id });
        faq.question = req.body.question;
        faq.answer = req.body.answer;
        faq.description = req.body.description;

        await faq.save();
        res.status(201).json({ message: "Faq is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

//Delete faq
const deleteFaq = async (req, res) => {
    const faq = await Faq.findOne({ id: req.params.id });
    if (faq) {
        await faq.remove();
        res.status(201).json({ message: "Faq removed" });
    } else {
        res.status(404).json({ message: "Faq is not present" });
    }
};



module.exports = { addFaq, getAllFaq, getFaqById, updateFaq, deleteFaq }