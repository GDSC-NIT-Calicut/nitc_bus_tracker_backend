const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

router.get('/get', busController.getBusById);

module.exports = router;
