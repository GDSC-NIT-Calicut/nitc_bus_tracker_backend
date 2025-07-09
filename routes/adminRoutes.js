const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/get-sharing-status', adminController.get_sharing_status);
router.post('/set-sharing-status', adminController.set_sharing_status);

module.exports = router;
