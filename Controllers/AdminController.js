const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User")

const Admin = require("../Models/Admin");
const Otp = require("../Models/Otp");

//register
const register = async (req, res) => {
  try {
    var adminId;

    const admin = await Admin.find();

    if (admin.length > 0) {
      adminId = admin[admin.length - 1].id + 1;
    } else {
      adminId = 1;
    }
    var userId;

    const user = await User.find();

    if (user.length > 0) {
      userId = user[user.length - 1].id + 1;
    } else {
      userId = 1;
    }
    const { name, phone, password, email } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      id: adminId,
      phone,
      email,
      name,
      password: passwordHash,
      tokens: [],
    });
    const savedAdmin = await newAdmin.save();
    const newUser = new User({
      id: userId,
      phone,
      email,
      name,
      password: passwordHash,
      tokens: [],
    });
    const savedUser = await newUser.save();
    res.status(201).send(savedAdmin);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//login-----
const login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    if (email) {
      var admin = await Admin.findOne({ email: email });
    } else {
      var admin = await Admin.findOne({ phone: phone });
    }

    if (!admin)
      return res.status(400).json({
        status: "failed",
        message: "No Account Found",
      });
    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched)
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    else {
      delete admin.password;
      const createToken = async () => {
        const token = await jwt.sign({ id: admin.id }, process.env.SECRETKEY, {
          expiresIn: 1008000,
        });
        const adminverify = await jwt.verify(token, process.env.SECRETKEY);
        let tokenArray = [
          {
            token,
          },
        ];
        admin.tokens = tokenArray;

        await admin.save();

        res.status(200).json({ admin });
      };
      createToken();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Get All admin
const getAllAdmin = async (req, res) => {
  try {
    var data = await Admin.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Admin by id--
const getAdminById = async (req, res) => {
  const admin = await Admin.findOne({ id: req.params.id });
  if (admin) {
    res.status(201).send(admin);
  } else {
    res.status(400).send({ message: "No admin found" });
  }
};

//Delete admin
const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({ id: req.params.id });
  if (admin) {
    await admin.remove();
    res.status(201).json({ message: "Admin removed" });
  } else {
    res.status(404).json({ message: "Admin is not present" });
  }
};

//Update Admin
const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ id: req.params.id });
    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.phone = req.body.phone;

    await admin.save();
    res.status(201).json({ message: "Admin is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//logout
const logout = async (req, res) => {
  try {
    const admin = await Admin.findOne({ id: req.params.id });
    admin.tokens[0][token] = "";
    admin.tokens[0][_id] = "";
    await admin.save();
    res.status(200).send("logout successful");
  } catch (error) {
    res.status(500).send(error);
  }
};

//email send
const emailSend = async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email });
  const responseType = {};
  if (admin) {
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
      to: admin.email,
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
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin.password === req.body.current_password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        admin.password = passwordHash;
        admin.save();
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
  register,
  login,
  logout,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  emailSend,
  changePassword,
  deleteAdmin,
};
