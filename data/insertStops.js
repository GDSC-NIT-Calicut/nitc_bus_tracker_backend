const sequelize = require('../config/database');
const Stop = require('../models/Stop');

async function insertStops() {
  try {
    await sequelize.authenticate(); // Ensures connection is valid
    await sequelize.sync();         // Syncs models with DB

    const stops = [
      { stop_id: 1, name: 'Main Building', lattitude: '11.321333', longitude: '75.934056' },
      { stop_id: 2, name: 'Architecture Department', lattitude: '11.322889', longitude: '75.936500' },
      { stop_id: 3, name: 'ECLC', lattitude: '11.323056', longitude: '75.937306' },
      { stop_id: 4, name: 'Main Gate', lattitude: '11.319975', longitude: '75.934198' },
      { stop_id: 5, name: 'Rajpat', lattitude: '11.320667', longitude: '75.933222' },
      { stop_id: 6, name: 'Chemical Department', lattitude: '11.323191', longitude: '75.937217' },
      { stop_id: 7, name: 'Mega Boys Hostel 2', lattitude: '11.317143', longitude: '75.937771' },
      { stop_id: 8, name: 'SOMS', lattitude: '11.3139', longitude: '75.932231' },
      { stop_id: 9, name: 'Auditorium', lattitude: '11.322646', longitude: '75.935845' },
      { stop_id: 10, name: 'ATM Circle', lattitude: '11.321607', longitude: '75.935015' },
      { stop_id: 11, name: 'Ladies Hostel', lattitude: '11.318389', longitude: '75.931056' },
    ];

    await Stop.bulkCreate(stops, { ignoreDuplicates: true });

    console.log('✅ All stops inserted!');
  } catch (error) {
    console.error('❌ Error inserting stops:', error);
  } finally {
    await sequelize.close();
  }
}

insertStops();
