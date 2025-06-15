const sequelize = require('../config/database');
const RouteStop = require('../models/RouteStop');

async function insertRouteStops() {
  await sequelize.sync(); // Ensure table exists

  const routeStops = [
    // Route 1: mb_to_ch (MBH2 → Chem_block)
    {
      route_id: 1,
      stop_id: 7, // Mega Boys Hostel 2
      stop_order: 1,
      stop_name: 'Mega Boys Hostel 2',
      eta_offset_minuts: 0
    },
    {
      route_id: 1,
      stop_id: 4, // Main Gate
      stop_order: 2,
      stop_name: 'Main Gate',
      eta_offset_minuts: 2
    },
    {
       route_id: 1,
       stop_id: 5, // Rajpat
       stop_order: 3,
       stop_name: 'Rajpat',
       eta_offset_minuts: 3
     },
    {
      route_id: 1,
      stop_id: 1, // Main Building
      stop_order: 4,
      stop_name: 'Main Building',
      eta_offset_minuts: 5
    },
    {
      route_id: 1,
      stop_id: 10, // ATM Circle
      stop_order: 5,
      stop_name: 'ATM Circle',
      eta_offset_minuts: 3
    },
    {
      route_id: 1,
      stop_id: 9, // Auditorium
      stop_order: 6,
      stop_name: 'Auditorium',
      eta_offset_minuts: 2
    },
    {
      route_id: 1,
      stop_id: 2, // Architecture Department
      stop_order: 7,
      stop_name: 'Architecture Department',
      eta_offset_minuts: 5
    },
    {
      route_id: 1,
      stop_id: 6, // Chemical Department
      stop_order: 8,
      stop_name: 'Chemical Department',
      eta_offset_minuts: 8
    },

    // Route 2: Chem_to_soms (Chem_dept → SOMS)
    {
      route_id: 2,
      stop_id: 6, // Chemical Department
      stop_order: 1,
      stop_name: 'Chemical Department',
      eta_offset_minuts: 0
    },
    {
      route_id: 2,
      stop_id: 2, // Architecture Department
      stop_order: 2,
      stop_name: 'Architecture Department',
      eta_offset_minuts: 5
    },
    {
      route_id: 2,
      stop_id: 9, // Auditorium
      stop_order: 2,
      stop_name: 'Auditorium',
      eta_offset_minuts: 2
    },
    {
      route_id: 2,
      stop_id: 10, // ATM Circle
      stop_order: 3,
      stop_name: 'ATM Circle',
      eta_offset_minuts: 3
    },
    {
      route_id: 2,
      stop_id: 1, // Main Building
      stop_order: 4,
      stop_name: 'Main Building',
      eta_offset_minuts: 5
    },
    {
       route_id: 2,
       stop_id: 5, // Rajpat
       stop_order: 5,
       stop_name: 'Rajpat',
       eta_offset_minuts: 3
     },
    {
      route_id: 2,
      stop_id: 4, // Main Gate
      stop_order: 6,
      stop_name: 'Main Gate',
      eta_offset_minuts: 2
    },
    {
      route_id: 2,
      stop_id: 11, // Ladies Hostel
      stop_order: 7,
      stop_name: 'Ladies Hostel',
      eta_offset_minuts: 5
    },
    {
      route_id: 2,
      stop_id: 8, // SOMS
      stop_order: 8,
      stop_name: 'SOMS',
      eta_offset_minuts: 7
    }
  ];

  for (const stop of routeStops) {
    await RouteStop.create(stop);
  }

  console.log('✅ All RouteStops inserted!');
  await sequelize.close();
}

insertRouteStops();
