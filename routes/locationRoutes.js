const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// POST /api/location
router.post('/post', locationController.postLocation);

// GET /api/location/:driverId
router.get('/get-buses', locationController.getBusLocations);

module.exports = router;
