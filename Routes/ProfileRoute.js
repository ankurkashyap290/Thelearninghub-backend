const express = require("express");

const ProfileController = require("../Controllers/ProfileController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "photo") {
      cb(null, "Images/Therapist/Photo");
    } else if (file.fieldname === "adhaar_card") {
      cb(null, "Images/Therapist/Adhaar Card");
    } else if (file.fieldname === "pan_card") {
      cb(null, "Images/Therapist/Pan Card");
    } else if (file.fieldname === "offer_letter") {
      cb(null, "Images/Therapist/Offer Letter");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const multiUpload = upload.fields([
  {
    name: "photo",
  },
  {
    name: "offer_letter",
  },
  {
    name: "adhaar_card",
  },
  {
    name: "pan_card",
  },
]);

router.post("/addprofile", multiUpload, ProfileController.addProfile);
router.get("/getallprofile", ProfileController.getAllProfile);
router.get("/getprofilebyid/:id", ProfileController.getProfileById);
router.put("/updateprofile/:id", multiUpload, ProfileController.updateProfile);
router.delete("/deleteprofile/:id", ProfileController.deleteProfile);

module.exports = router;
