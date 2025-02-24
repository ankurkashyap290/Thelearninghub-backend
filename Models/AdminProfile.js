const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    photo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,

    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});
const AdminProfile = new mongoose.model("AdminProfile", AdminProfileSchema);
module.exports = AdminProfile;
