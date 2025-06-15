const express = require('express');
const router = express.Router();

router.use('/bus', require('./busRoutes'));
router.use('/stops', require('./stopRoutes'));
router.use('/location', require('./locationRoutes'));
router.use('/user', require('./userAuthRoutes'));
router.use('/bus-statuses', require('./busStatusRoutes'));
router.use('/notices', require('./noticeRoutes'));
router.use('/notifications', require('./notificationRoutes'));
router.use('/route-stops', require('./routeStopRoutes'));

module.exports = router;
