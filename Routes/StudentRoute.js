const express = require("express");

const StudentController = require("../Controllers/StudentController");
const Student = require("../Models/Student");

const multer = require("multer");

const router = express.Router();

const path = require("path");
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "Images/Student");
    } else if (file.fieldname === "student_adhaar") {
      cb(null, "Images/Docs/Student/Adhaar Card");
    } else if (file.fieldname === "student_report") {
      cb(null, "Images/Docs/Student/Doctor Report");
    }
    // else if (file.fieldname === "student_admission") {
    //   cb(null, "Images/Docs/Student/Admission Form");
    // }
    else if (file.fieldname === "parent_adhaar") {
      cb(null, "Images/Docs/Parent/Adhaar Card");
    } else if (file.fieldname === "parent_pan") {
      cb(null, "Images/Docs/Parent/Pan Card");
    } else if (file.fieldname === "parent_photo") {
      cb(null, "Images/Docs/Parent/Photo");
    }
    // else if (file.fieldname === "e_signature") {
    //   cb(null, "Images/E-Signature");
    // }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const multiUpload = upload.fields([
  {
    name: "image",
  },
  // {
  //   name: "e_signature",
  // },
  {
    name: "student_adhaar",
  },
  {
    name: "student_report",
  },
  // {
  //   name: "student_admission",
  // },
  {
    name: "parent_adhaar",
  },
  {
    name: "parent_pan",
  },
  {
    name: "parent_photo",
  },
]);

router.post("/addstudent", multiUpload, StudentController.addStudent);
router.get("/getallstudent", StudentController.getAllStudent);
router.get("/getstudentbyid/:id", StudentController.getStudentById);
router.put("/updatestudent/:id", multiUpload, StudentController.updateStudent);
router.get("/logout/:id", multiUpload, StudentController.logout);
router.delete("/deletestudent/:id", StudentController.deleteStudent);

router.post("/emailsend", multiUpload, StudentController.emailSend);
router.post("/changepassword", multiUpload, StudentController.changePassword);

module.exports = router;
