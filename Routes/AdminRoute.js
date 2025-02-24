const express = require("express");

const AdminController = require("../Controllers/AdminController");

const multer = require("multer");

const router = express.Router();

const upload = multer().array();

router.post("/register", upload, AdminController.register);
router.post("/login", upload, AdminController.login);
router.get("/getAllAdmin", AdminController.getAllAdmin);
router.post("/sendemail",upload, AdminController.emailSend);
router.post("/changepassword",upload, AdminController.changePassword);
router.get("/getAdminById/:id", AdminController.getAdminById);
router.put("/updateAdmin/:id", upload, AdminController.updateAdmin);
router.get("/logout/:id", upload, AdminController.logout);
router.delete("/deleteAdmin/:id", AdminController.deleteAdmin);

module.exports = router;
