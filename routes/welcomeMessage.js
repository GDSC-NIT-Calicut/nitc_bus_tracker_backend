const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Bus Tracking API');
});

module.exports = router;
