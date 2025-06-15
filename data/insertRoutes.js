const sequelize = require('../config/database');
const Route = require('../models/Route');

async function insertRoutes() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const routes = [
      {
        name: 'MB_to_CH',
        start_location: 'Mega Boys Hostel 2',
        end_location: 'Chemical Department',
        operational_start_time: 800,
        operational_end_time: 1730,
      },
      {
        name: 'CHEM_to_SOMS',
        start_location: 'Chemical Department',
        end_location: 'SOMS',
        operational_start_time: 800,
        operational_end_time: 1730,
      }
    ];

    await Route.bulkCreate(routes, { ignoreDuplicates: true });

    console.log('✅ All routes inserted!');
  } catch (error) {
    console.error('❌ Error inserting routes:', error);
  } finally {
    await sequelize.close();
  }
}

insertRoutes();
