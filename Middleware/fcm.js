const express = require("express");
const FCM = require("fcm-node");
const router = express.Router();
const dotenv = require("dotenv");
const Notification = require("../Models/Notification");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "Images/Notification",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage }).array("image");

dotenv.config();
const app = express();
app.use(express.json());

router.post("/push_notification", upload, async (req, res, next) => {
  try {
    let fcm = new FCM(
      "AAAA5FK9qTM:APA91bFG1YDMe3wYx7mRRiep6w4spEBBeploVLMG9ezE6XgK8P9Os_J0nph0lqMENXIZp9jSb_YCgov6Erdkdjj4HLbI1-1ylR4DOCHq6TF9PagOoHN8lKMAQNQ0NSx8DoNxotlzq8gG"
    );

    let message = {
      to: "/topics/" + req.body.topic,
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
      },
      data: req.body.data,
    };

    fcm.send(message, (error, response) => {
      if (error) {
        next(error);
      } else {
        const result = {
          response,
          message: req.body.data.message,
        };
        res.send(result);
      }
    });
    ///notifcation Id--
    var notificationId;
    const notification = await Notification.find();
    if (notification.length > 0) {
      notificationId = notification[notification.length - 1].id + 1;
    } else {
      notificationId = 1;
    }
    const newNotification = new Notification({
      id: notificationId,
      topic: req.body.topic,
      title: req.body.title,
      data: req.body.data,
      image: req.files[0].filename,
    });
    await newNotification.save();
  } catch (error) {
    next(error);
  }
});

//Get All notitfication-
router.get("/getallpush_notification", async (req, res) => {
  try {
    var data = await Notification.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal server error" });
  }
});

// Get Notification by id-
router.get("/getpush_notificationbyid/:id", async (req, res) => {
  const notitfication = await Notification.findOne({ id: req.params.id });
  if (notitfication) {
    res.status(201).send(notitfication);
  } else {
    res.status(400).send({ message: "No Notitfication found" });
  }
});

module.exports = router;
