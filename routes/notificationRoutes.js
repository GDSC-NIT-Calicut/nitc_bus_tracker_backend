const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post("/student", notificationController.pushNotifsStudent);

router.post("/driver", notificationController.pushNotifsDriver);

router.post("/both", notificationController.pushNotifsBoth);

module.exports = router;
