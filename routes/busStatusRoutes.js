const express = require('express');
const router = express.Router();
const busStatusController = require('../controllers/busStatusController');

router.get('/get', busStatusController.getBusStatuses);

router.post('/post', busStatusController.postBusStatuses);

module.exports = router;
