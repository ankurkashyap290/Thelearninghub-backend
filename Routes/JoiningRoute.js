const express = require("express");

const JoiningController = require("../Controllers/JoiningController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "resume") {
          cb(null, "Images/Resume");
        }},
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
        }
    })
  

  const upload = multer({ storage: storage }).array("resume");
  


router.post("/addjoining", upload, JoiningController.addJoining);
router.get("/getalljoining", JoiningController.getAllJoining);
router.get("/getjoiningbyid/:id", JoiningController.getJoiningById);
router.put("/updatejoining/:id", upload, JoiningController.updateJoining);
router.delete("/deletejoining/:id", JoiningController.deleteJoining);

module.exports = router;
