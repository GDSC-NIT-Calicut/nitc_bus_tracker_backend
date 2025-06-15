const Location = require('../models/Location');

// POST /api/location
exports.postLocation = async (req, res) => {
  const { bus_id, latitude, longitude } = req.body;

  if (!bus_id || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await Location.upsert({ bus_id, latitude, longitude, updatedAt: new Date() });
    res.status(200).json({ message: 'Location updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBusLocations = async (req, res) => {
  try {
    const buses = await Location.findAll();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
