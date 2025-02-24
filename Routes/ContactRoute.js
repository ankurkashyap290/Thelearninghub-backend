const express = require("express");

const ContactController = require("../Controllers/ContactController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const upload = multer().array();


router.post("/addcontact", upload, ContactController.addContact);
router.get("/getallcontact", ContactController.getAllContact);
router.get("/getcontactbyid/:id", ContactController.getContactById);
router.put("/updatecontact/:id", upload, ContactController.updateContact);
router.delete("/deletecontact/:id", ContactController.deleteContact);

module.exports = router;
