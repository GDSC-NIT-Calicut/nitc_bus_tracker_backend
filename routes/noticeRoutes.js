const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.get('/get', noticeController.getNotices);

router.post('/post', noticeController.postNotice);

router.delete('/delete/:topic', noticeController.deleteNotice);

module.exports = router;
