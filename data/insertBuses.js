const sequelize = require('../config/database');
const Bus = require('../models/Bus');  // Make sure this model is defined correctly

async function insertBuses() {
  try {
    await sequelize.authenticate();  // Ensure DB connection
    await sequelize.sync();          // Sync models with DB

    const buses = [
      {
        bus_id: 'LH BUS 2',
        license_number: 'KL 12 N 4321',
        capacity: 50,
        assigned_route_id: 2,
      },
      {
        bus_id: 'MBH BUS 1',
        license_number: 'KL 11 N 1234',
        capacity: 50,
        assigned_route_id: 1,
      },
      {
        bus_id: 'MBH2',
        license_number: 'KL 11 N 1134',
        capacity: 50,
        assigned_route_id: 1,
      },
      {
        bus_id: 'MLH',
        license_number: 'KL 11 N 4321',
        capacity: 50,
        assigned_route_id: 2,
      },
    ];

    await Bus.bulkCreate(buses, { ignoreDuplicates: true });

    console.log('✅ All buses inserted!');
  } catch (error) {
    console.error('❌ Error inserting buses:', error);
  } finally {
    await sequelize.close();
  }
}

insertBuses();
