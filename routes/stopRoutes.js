const express = require('express');
const router = express.Router();
const stopController = require('../controllers/stopController');

router.get('/get', stopController.getStops);

module.exports = router;
