const AdminProfile = require("../Models/AdminProfile");
const Admin = require("../Models/Admin");

const addAdminProfile = async (req, res) => {
  try {
    var adminProfileId;

    const adminProfile = await AdminProfile.find();

    if (adminProfile.length > 0) {
      adminProfileId = adminProfile[adminProfile.length - 1].id + 1;
    } else {
      adminProfileId = 1;
    }
    const { address, username, admin } = req.body;

    const newAdminProfile = new AdminProfile({
      id: adminProfileId,
      admin,
      address,
      username,
      photo: req.files[0].filename,
    });
    const savedAdminProfile = await newAdminProfile.save();
    res.status(201).send(savedAdminProfile);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//Get All admin profile
const getAllAdminProfile = async (req, res) => {
  try {
    var data = await AdminProfile.find().populate("admin");
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
};
// Get AdminProfile by id--
const getAdminProfileById = async (req, res) => {
  const adminProfile = await AdminProfile.findOne({
    id: req.params.id,
  }).populate("admin");
  if (adminProfile) {
    res.status(201).send(adminProfile);
  } else {
    res.status(400).send({ message: "No admin profile found" });
  }
};

//Delete admin profile
const deleteAdminProfile = async (req, res) => {
  const adminProfile = await AdminProfile.findOne({ id: req.params.id });
  if (adminProfile) {
    await adminProfile.remove();
    res.status(201).json({ message: "AdminProfile removed" });
  } else {
    res.status(404).json({ message: "AdminProfile is not present" });
  }
};

//Update AdminProfile
const updateAdminProfile = async (req, res) => {
  try {
    const adminProfile = await AdminProfile.findOne({ id: req.params.id });
    adminProfile.photo = req.files[0].filename;
    adminProfile.address = req.body.address;
    adminProfile.username = req.body.username;

    // edit admin from here
    const admin = await Admin.findOne({ _id: adminProfile.admin.toString() });
    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.phone = req.body.phone;
    await admin.save();

    await adminProfile.save();
    res.status(201).json({ message: "Admin Profile is updated." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  addAdminProfile,
  getAllAdminProfile,
  getAdminProfileById,
  updateAdminProfile,
  deleteAdminProfile,
};
