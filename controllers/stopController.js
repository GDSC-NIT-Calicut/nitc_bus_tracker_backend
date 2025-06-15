const Stop = require('../models/Stop');

exports.getStops = async (req, res) => {
  try {
    const stops = await Stop.findAll();
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
