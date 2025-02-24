const express = require("express");

const SalaryController = require("../Controllers/SalaryController");

const multer = require("multer");

const router = express.Router();

const path = require("path");


const storage = multer.diskStorage({
    destination: "Images/Salary",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).array("payment_slip");
  


router.post("/addsalary", upload, SalaryController.addSalary);
router.get("/getallsalary", SalaryController.getAllSalary);
router.get("/getsalarybyid/:id", SalaryController.getSalaryById);
router.put("/updatesalary/:id", upload, SalaryController.updateSalary);
router.delete("/deletesalary/:id", SalaryController.deleteSalary);

module.exports = router;
