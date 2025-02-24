const express = require("express");

const TherapistController = require("../Controllers/TherapistController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const jwt = require("jsonwebtoken");


const upload = multer().array();



router.post("/register", upload, TherapistController.register);
router.post("/login", upload, TherapistController.login);
router.get("/logout/:id",TherapistController.logout);
router.get("/getalltherapist", TherapistController.getAllTherapist);
router.post("/sendemail",upload, TherapistController.emailSend);
router.post("/changepassword",upload, TherapistController.changePassword);
router.get("/gettherapistbyid/:id", TherapistController.getTherapistById);

router.put("/updatetherapist/:id", upload, TherapistController.updateTherapist);
router.delete("/deletetherapist/:id", TherapistController.deleteTherapist);

router.get("/gettherapistbymongoid", upload, TherapistController.getTherapistByMongoId);

module.exports = router;
