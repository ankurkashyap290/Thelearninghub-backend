const express = require("express");

const Student = require("../Models/Student");
const Otp = require("../Models/Otp");

//Add Student
const addStudent = async (req, res) => {
	try {
		var studentId;

		const student = await Student.find();

		if (student.length > 0) {
			studentId = student[student.length - 1].id + 1;
		} else {
			studentId = 1;
		}
		const {
			name,
			username,
			gender,
			dob,
			pin,
			country,
			city,
			state,
			parent_information,
			attendance,
			therapist,
			address,
			purpose,
			class_left,
		} = req.body;

		const newStudent = new Student({
			id: studentId,
			name,
			username,
			gender,
			dob,
			pin,
			father_name: req.body.father_name,
			mother_name: req.body.mother_name,
			parent_email: req.body.parent_email,
			parent_phone: req.body.parent_phone,
			country,
			state,
			city,
			address,
			purpose,
			image: req.files.image[0].filename,
			student_adhaar: req.files.student_adhaar[0].filename,
			student_report: req.files.student_report[0].filename,
			parent_photo: req.files.parent_photo[0].filename,
			parent_pan: req.files.parent_pan[0].filename,
			parent_adhaar: req.files.parent_adhaar[0].filename,
		});
		const savedStudent = await newStudent.save();

		res.status(201).send(savedStudent);
	} catch (e) {
		res.status(500).send(e.message);
	}
};

//Get All student
const getAllStudent = async (req, res) => {
	try {
		var data = await Student.find();
		res.send({ result: "Done", data: data });
	} catch (error) {
		res.status(500).send({ result: "Fail", message: "Internal server error" });
	}
};
// Get Student by id--
const getStudentById = async (req, res) => {
	const student = await Student.findOne({ id: req.params.id });
	if (student) {
		res.status(201).send(student);
	} else {
		res.status(400).send({ message: "No student found" });
	}
};

//Delete student
const deleteStudent = async (req, res) => {
	const student = await Student.findOne({ id: req.params.id });
	if (student) {
		await student.remove();
		res.status(201).json({ message: "Student removed" });
	} else {
		res.status(404).json({ message: "Student is not present" });
	}
};

//Update Student
const updateStudent = async (req, res) => {
	try {
		const student = await Student.findOne({ id: req.params.id });
		student.name = req.body.name;
		student.username = req.body.username;
		student.dob = req.body.dob;
		student.gender = req.body.gender;
		student.pin = req.body.pin;
		student.city = req.body.city;
		student.state = req.body.state;
		student.country = req.body.country;
		student.father_name = req.body.father_name;
		student.mother_name = req.body.mother_name;
		student.parent_email = req.body.parent_email;
		student.parent_phone = req.body.parent_phone;
		student.address = req.body.address;
		student.purpose = req.body.purpose;

		student.image = req.files.image[0].filename;
		student.student_adhaar = req.files.student_adhaar[0].filename;
		student.student_report = req.files.student_report[0].filename;
		student.parent_adhaar = req.files.parent_adhaar[0].filename;
		student.parent_pan = req.files.parent_pan[0].filename;
		student.parent_photo = req.files.parent_photo[0].filename;

		await student.save();
		res.status(201).json({ message: "Student is updated." });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};
//logout
const logout = async (req, res) => {
	try {
		const student = await Student.findOne({ id: req.params.id });
		student.tokens[0][token] = "";
		student.tokens[0][_id] = "";
		await student.save();
		res.status(200).send("logout successful");
	} catch (error) {
		res.status(500).send(error);
	}
};

//email send
const emailSend = async (req, res) => {
	let student = await Student.findOne({ email: req.body.email });
	const responseType = {};
	if (student) {
		let otpCode = Math.floor(Math.random() * 10000 + 1);

		let otp = new Otp({
			email: req.body.email,
			code: otpCode,
			expireIn: new Date().getTime() + 300 * 1000,
		});

		let transporter = nodemailer.createTransport({
			service: "Gmail",
			secure: false,
			auth: {
				user: "Enter Your Email Id",
				pass: "Enter App Password",
			},
		});

		var mailOptions = {
			from: "Enter Your Email Id",
			to: student.email,
			subject: "OTP Verification for password reset",
			text: `This is your OTP for Password reset: ${otpCode}`,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log(info.response);
			}
		});

		await otp.save();
		responseType.statusText = "Success";
		responseType.message = "Please check your email id";
	} else {
		responseType.statusText = "Error";
		responseType.message = "Email id not exists.";
	}
	res.status(200).json(responseType);
};

//change password
const changePassword = async (req, res) => {
	let otp = await Otp.find({ email: req.body.email, code: req.body.otpCode });
	const response = {};
	if (otp) {
		let currentTime = new Date().getTime();
		let diff = otp.expiresIn - currentTime;
		if (diff < 0) {
			response.message = "Token expired";
			response.statusText = "Error";
		} else {
			let student = await Student.findOne({ email: req.body.email });
			if (student.password === req.body.current_password) {
				const salt = await bcrypt.genSalt();
				const passwordHash = await bcrypt.hash(req.body.password, salt);
				student.password = passwordHash;
				student.save();
				response.message = "Password changed Successfully";
				response.statusText = "Success";
			} else {
				response.message = "Incorrect Password";
				response.statusText = "Failure";
			}
		}
	} else {
		response.message = "Invalid OTP";
		response.statusText = "Error";
	}
	res.status(200).json(response);
};

module.exports = {
	addStudent,
	getAllStudent,
	logout,
	getStudentById,
	updateStudent,
	deleteStudent,
	emailSend,
	changePassword,
};
