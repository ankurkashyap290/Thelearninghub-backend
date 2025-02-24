const express = require("express");
// const path = require("path");

const app = express();
// const socketio = require("socket.io");
const userRoutes = require("./Routes/UserRoute");
const mongoose = require("mongoose");
const Message = require("./Models/Message");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./Models/User");

const rooms = ["general", "tech", "finance", "crypto"];

mongoose.set("strictQuery", false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use("/users", userRoutes);

const therapistRoute = require("./Routes/TherapistRoute");
const timeTableRoute = require("./Routes/TimeTableRoute");
const leaveRoute = require("./Routes/LeaveRoute");
const attendanceRoute = require("./Routes/AttendanceRoute");
const profileRoute = require("./Routes/ProfileRoute");
const paymentRoute = require("./Middleware/Payment");
const adminRoute = require("./Routes/AdminRoute");
const adminProfileRoute = require("./Routes/AdminProfileRoute");
const reportRoute = require("./Routes/ReportRoute");
const fcmRoute = require("./Middleware/fcm");
const groupRoute = require("./Routes/GroupRoute");
const classScheduleRoute = require("./Routes/ClassScheduleRoute");
const financialRecordRoute = require("./Routes/FinancialRecordRoute");
const faqRoute = require("./Routes/FaqRoute");
const checkInOutRoute = require("./Routes/CheckInOutRoute");
const contactRoute = require("./Routes/ContactRoute");
const joiningRoute = require("./Routes/JoiningRoute");
const salaryRoute = require("./Routes/SalaryRoute");
const enquiryRoute = require("./Routes/EnquiryRoute");
const vaultRoute = require("./Routes/VaultRoute");
// const studentRoute = require("./Routes/StudentRoute");
const stdRoute = require("./Routes/StdRoute");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// socket connection

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id } = req.body;
      console.log("user logged out");
      const user = await User.findById(_id);
      user.status = "offline";
      //  user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

app.use("/therapist", therapistRoute);
// app.use("/student", studentRoute);
app.use("/timetable", timeTableRoute);
app.use("/leave", leaveRoute);
app.use("/attendance", attendanceRoute);
app.use("/profile", profileRoute);
app.use("/payment", paymentRoute);
app.use("/fcm", fcmRoute);
app.use("/admin", adminRoute);
app.use("/adminprofile", adminProfileRoute);
app.use("/report", reportRoute);
app.use("/group", groupRoute);
app.use("/contact", contactRoute);
app.use("/classschedule", classScheduleRoute);
app.use("/financialrecord", financialRecordRoute);
app.use("/faq", faqRoute);
app.use("/joining", joiningRoute);
app.use("/salary", salaryRoute);
app.use("/enquiry", enquiryRoute);
app.use("/checkinout", checkInOutRoute);
app.use("/vault", vaultRoute);
app.use("/std", stdRoute);

//configuration of env
dotenv.config();

//mongoose connectivity
mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("db is connected");
  })
  .catch((e) => {
    console.log(`${e}`);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
