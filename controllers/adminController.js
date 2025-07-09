const Location = require('../models/Location');

// POST /api/location
exports.get_sharing_status = async (req, res) => {
  const bus_id = req.query.busId;
  try {
    const status = await Location.findOne({
    where: { bus_id: bus_id },
    attributes: ['isSharing']
  });
    res.status(200).json({ isSharing: status.isSharing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.set_sharing_status = async (req, res) => {
  const {bus_id, isSharing } = req.query

  console.log(bus_id, isSharing);
  try {
    const status = await Location.update(
    { isSharing: isSharing },
    {where: { bus_id: bus_id }
  });
    res.status(200).json({ message: 'Disabled sharing for status.bus_id' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
