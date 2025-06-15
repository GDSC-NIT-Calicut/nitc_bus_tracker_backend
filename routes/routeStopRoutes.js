const express = require('express');
const router = express.Router();
const RouteStop = require('../models/RouteStop'); // Adjust path as needed

// GET /api/route-stops/get/:route_id
router.get('/get/:route_id', async (req, res) => {
  const routeIdRaw = req.params.route_id;
  console.log(`[DEBUG] Received request for route_id: ${routeIdRaw}`);

  const routeId = parseInt(routeIdRaw, 10);
  if (isNaN(routeId)) {
    console.error(`[ERROR] Invalid route_id: ${routeIdRaw}`);
    return res.status(400).json({ error: 'Invalid route_id' });
  }

  try {
    console.log(`[DEBUG] Querying RouteStop for route_id=${routeId}`);
    const routeStops = await RouteStop.findAll({
      where: { route_id: routeId },
      order: [['stop_order', 'ASC']],
    });

    console.log(`[DEBUG] Found ${routeStops.length} route stops for route_id=${routeId}`);
    res.json(routeStops);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch route stops for route_id=${routeId}:`, error);
    res.status(500).json({ error: 'Failed to fetch route stops' });
  }
});

module.exports = router;
