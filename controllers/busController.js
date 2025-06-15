const Bus = require('../models/Bus');

// Get all buses
exports.getBuses = async (req, res) => {
  try {
    // 1. Get latest timestamp per bus_id
    const latest = await Bus.findAll({
      attributes: [
        'bus_id',
        [Sequelize.fn('MAX', Sequelize.col('lastUpdated')), 'lastUpdated']
      ],
      group: ['bus_id'],
      raw: true
    });

    // 2. For each bus_id, get the full row with that timestamp
    const buses = await Promise.all(latest.map(async ({ bus_id, lastUpdated }) => {
      return await Bus.findOne({
        where: { bus_id, lastUpdated },
        attributes: ['bus_id', 'latitude', 'longitude', 'lastUpdated']
      });
    }));

    res.json(buses.filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bus by ID
exports.getBusById = async (req, res) => {
  try {
    const { busId } = req.query;
    const bus = await Bus.findOne({ where: { bus_id: busId } });
    if (!bus) return res.status(404).json({ error: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
