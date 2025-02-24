const mongoose = require("mongoose");

const ClassScheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    date: {
        type: String
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    therapist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Therapist"
    },
    class_time: {
        type: String,
    },
});
const ClassSchedule = new mongoose.model("ClassSchedule", ClassScheduleSchema);
module.exports = ClassSchedule;
