const express = require("express");

const GroupController = require("../Controllers/GroupController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const upload = multer().array();


router.post("/addgroup", upload, GroupController.addGroup);
router.get("/getallgroup", GroupController.getAllGroup);
router.get("/getgroupbyid/:id", GroupController.getGroupById);
router.put("/updategroup/:id", upload, GroupController.updateGroup);
router.delete("/deletegroup/:id", GroupController.deleteGroup);

module.exports = router;
