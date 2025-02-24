const express = require("express");
const VaultController = require("../Controllers/VaultController");
const multer = require("multer");
const path = require("path");
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/Vault");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).array("image");

router.post("/addimage", upload, VaultController.addVault);
router.get("/getallimage", VaultController.getAllVault);
router.get("/getimagebyid/:id", VaultController.getVaultById);
router.put("/updateimage/:id", upload, VaultController.updateVault);
router.delete("/deleteimage/:id", VaultController.deleteVault);

module.exports = router;
