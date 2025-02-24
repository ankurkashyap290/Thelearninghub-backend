const express = require("express");

const ReportController = require("../Controllers/ReportController");

const multer = require("multer");

const router = express.Router();

const path = require("path");

const storage = multer.diskStorage({
  destination: "Images/Report",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).array("excelsheet");

router.post("/addreport", upload, ReportController.addReport);
router.get("/getallreport", ReportController.getAllReport);
router.get("/getreportbyid/:id", ReportController.getReportById);
router.get("/getreportbystudent/:id", ReportController.getReportByStudent);
router.put("/updatereport/:id", upload, ReportController.updateReport);
router.delete("/deletereport/:id", ReportController.deleteReport);

module.exports = router;
