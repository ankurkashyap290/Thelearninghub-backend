const express = require("express");

const AdminProfileController = require("../Controllers/AdminProfileController");

const multer = require("multer");

const router = express.Router();
const path = require("path");


const storage = multer.diskStorage({
    destination: "Images/Admin",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage }).array("photo");



router.post("/addadminprofile",upload,AdminProfileController.addAdminProfile);
router.get("/getalladminprofile",AdminProfileController.getAllAdminProfile);
router.get("/getadminprofilebyid/:id",AdminProfileController.getAdminProfileById);
router.put("/updateadminprofile/:id", upload,AdminProfileController.updateAdminProfile);
router.delete("/deleteadminprofile/:id",AdminProfileController.deleteAdminProfile);

module.exports = router;
