const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User")

const Therapist = require("../Models/Therapist");
const Otp = require("../Models/Otp");

//register
const register = async (req, res) => {
  try {
    var therapistId;

    const therapist = await Therapist.find();

    if (therapist.length > 0) {
      therapistId = therapist[therapist.length - 1].id + 1;
    } else {
      therapistId = 1;
    }
    var userId;

    const user = await User.find();

    if (user.length > 0) {
      userId = user[user.length - 1].id + 1;
    } else {
      userId = 1;
    }
    const { name, phone, email, password, tokens } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newTherapist = new Therapist({
      id: therapistId,
      name,
      phone,
      email,
      password: passwordHash,
      tokens,
    });
    const savedTherapist = await newTherapist.save();
    //For Chat---------
    const newUser = new User({
      id: userId,
      name,
      phone,
      email,
      password: passwordHash,
      tokens,
    });
    const savedUser = await newUser.save();
    res.status(201).send(savedTherapist);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//login-----
const login = async (req, res) => {
  try {
    const { email, password, phone } = req.body;
    if (email) {
      var therapist = await Therapist.findOne({ email: email });
    } else {
      var therapist = await Therapist.findOne({ phone: phone });
    }
    if (!therapist)
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    const isMatched = await bcrypt.compare(password, therapist.password);
    if (!isMatched)
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    else {
      delete therapist.password;
      const createToken = async () => {
        const token = await jwt.sign(
          { id: therapist.id },
          process.env.SECRETKEY,
          {
            expiresIn: 1008000,
          }
        );
        const therapistverify = await jwt.verify(token, process.env.SECRETKEY);
        let tokenArray = [
          {
            token,
          },
        ];
        therapist.tokens = tokenArray;
        req.token = token;
        req.therapist = therapist;
        await therapist.save();

        res.status(200).json({ therapist });
      };
      createToken();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//logout
const logout = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({ id: req.params.id });
    therapist.tokens[0][token] = "";
    therapist.tokens[0][_id] = "";
    await therapist.save();
    res.status(200).send("logout successful");
  } catch (error) {
    res.status(500).send(error);
  }
};

//Get All therapist
const getAllTherapist = async (req, res) => {
  try {
    var data = await Therapist.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get Therapist by id--
const getTherapistById = async (req, res) => {
  const therapist = await Therapist.findOne({ id: req.params.id });
  if (therapist) {
    res.status(201).send(therapist);
  } else {
    res.status(400).send({ message: "No therapist found" });
  }
};
// Get Therapist by id--
const getTherapistByMongoId = async (req, res) => {
  console.log(req.body._id)
  const therapist = await Therapist.findOne({ _id: req.body._id });
  if (therapist) {
    res.status(201).send(therapist);
  } else {
    res.status(400).send({ message: "No therapist found" });
  }
};

//Delete therapist
const deleteTherapist = async (req, res) => {
  const therapist = await Therapist.findOne({ id: req.params.id });
  if (therapist) {
    await therapist.remove();
    res.status(201).json({ message: "Therapist removed" });
  } else {
    res.status(404).json({ message: "Therapist is not present" });
  }
};

//Update Therapist
const updateTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({ id: req.params.id });
    therapist.name = req.body.name;
    therapist.email = req.body.email;
    therapist.phone = req.body.phone;

    await therapist.save();
    res.status(201).json({ message: "Therapist is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//email send
const emailSend = async (req, res) => {
  let therapist = await Therapist.findOne({ email: req.body.email });
  const responseType = {};
  if (therapist) {
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
      to: therapist.email,
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
      let therapist = await Therapist.findOne({ email: req.body.email });
      if (therapist.password === req.body.current_password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        therapist.password = passwordHash;
        therapist.save();
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
  emailSend,
  changePassword,
  getAllTherapist,
  getTherapistById,
  getTherapistByMongoId,
  updateTherapist,
  deleteTherapist,
};
