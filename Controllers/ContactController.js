const express = require("express");

const Contact = require("../Models/Contact");
// const Therapist = require("../Models/Therapist");

//Add Contact
const addContact = async (req, res) => {
    try {

        var contactId;

        const contact = await Contact.find()

        if (contact.length > 0) {
            contactId = contact[contact.length - 1].id + 1;
        } else {
            contactId = 1;
        }
        const {
            name,
            address,
            phone,
            message,
        } = req.body;

        const newContact = new Contact({
            id: contactId,
            name,
            address,
            phone,
            message,
        });

        const savedContact = await newContact.save();

        res.status(201).send(savedContact);
    } catch (e) {
        res.status(500).send(e.message);
    }
};



//Get All Contact
const getAllContact = async (req, res) => {
    try {
        var data = await Contact.find();
        res.send({ result: "Done", data: data });
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal server error" });
    }
};
// Get Contact by id--
const getContactById = async (req, res) => {
    const contact = await Contact.findOne({ id: req.params.id });
    if (contact) {
        res.status(201).send(contact);
    } else {
        res.status(400).send({ message: "No contact found" });
    }
};

//Delete contact
const deleteContact = async (req, res) => {
    const contact = await Contact.findOne({ id: req.params.id });
    if (contact) {
        await contact.remove();
        res.status(201).json({ message: "Contact removed" });
    } else {
        res.status(404).json({ message: "Contact is not present" });
    }
};

//Update Contact
const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id });
        contact.name = req.body.name;
        contact.address = req.body.address;
        contact.phone = req.body.phone;
        contact.message = req.body.message;
       
        await contact.save();
        res.status(201).json({ message: "Contact is updated." });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};



module.exports = { addContact, getAllContact, getContactById, updateContact, deleteContact }