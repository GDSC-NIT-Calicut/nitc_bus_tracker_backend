const Bus = require('../models/Bus');

// Get all buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await sequelize.query(
      `SELECT b1.*
       FROM Buses b1
       INNER JOIN (
         SELECT bus_id, MAX(lastUpdated) AS latest
         FROM Buses
         GROUP BY bus_id
       ) b2 ON b1.bus_id = b2.bus_id AND b1.lastUpdated = b2.latest`,
      {
        type: QueryTypes.SELECT
      }
    );

    res.json(buses);
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
