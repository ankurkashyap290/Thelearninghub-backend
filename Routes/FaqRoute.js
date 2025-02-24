const express = require("express");

const FaqController = require("../Controllers/FaqController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const upload = multer().array();

router.post("/addfaq", upload, FaqController.addFaq);
router.get("/getallfaq", FaqController.getAllFaq);
router.get("/getfaqbyid/:id", FaqController.getFaqById);
router.put("/updatefaq/:id", upload, FaqController.updateFaq);
router.delete("/deletefaq/:id", FaqController.deleteFaq);

module.exports = router;
