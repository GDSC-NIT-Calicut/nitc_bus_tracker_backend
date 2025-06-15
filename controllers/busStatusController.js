const BusStatus = require('../models/BusStatus');

// GET /api/bus-status
exports.getBusStatuses = async (req, res) => {
  try {
    const busStatuses = await BusStatus.findAll();
    res.json(busStatuses);
  } catch (err) {
    console.error('Error fetching bus status summary:', err);
    res.status(500).json({ error: 'Failed to fetch bus status' });
  }
};

// POST /api/bus-status
exports.postBusStatuses = async (req, res) => {
  try {
    const { bus_id, current_stop_name, eta } = req.body;

    // Update if exists, otherwise create new
    const [busStatus, created] = await BusStatus.upsert({
      bus_id,
      current_stop_name,
      eta
    });

    res.status(200).json({ success: true, message: created ? 'Created' : 'Updated' });
  } catch (err) {
    console.error('Error saving bus status:', err);
    res.status(500).json({ error: 'Failed to save bus status' });
  }
};

