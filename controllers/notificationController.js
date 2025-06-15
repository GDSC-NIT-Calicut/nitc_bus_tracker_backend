const admin = require("../firebase");

exports.pushNotifsStudent = async (req, res) => {
  const { name, topic, to_whom, message, timestamp } = req.body;

  const notif = {
    topic: "notifications-student",
    notification: {
      title: `${topic}`,
      body: `${message}`,
    }
  };

  try {
    const response = await admin.messaging().send(notif);
    res.status(200).send("Notification sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send notification");
  }
};

exports.pushNotifsDriver = async (req, res) => {
  const { name, topic, to_whom, message, timestamp } = req.body;

  const notif = {
    topic: "notifications-driver",
    notification: {
      title: `${topic}`,
      body: `${message}`,
    }
  };

  try {
    const response = await admin.messaging().send(notif);
    res.status(200).send("Notification sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send notification");
  }
};

exports.pushNotifsBoth = async (req, res) => {
  const { name, topic, to_whom, message, timestamp } = req.body;

  const notif = {
    topic: "notifications",
    notification: {
      title: `${topic}`,
      body: `${message}`,
    }
  };

  try {
    const response = await admin.messaging().send(notif);
    res.status(200).send("Notification sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send notification");
  }
};
