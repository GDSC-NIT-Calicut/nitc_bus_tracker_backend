const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/login', userController.login);

router.post('/partial-registration', userController.partial_registration);

router.post('/complete-registration', userController.complete_registration);

router.post('/edit-profile', userController.edit_profile);

router.get('/exists', userController.user_exists);

router.get('/getinfo', userController.get_user_info);

module.exports = router;
