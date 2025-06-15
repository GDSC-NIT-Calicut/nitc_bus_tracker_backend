const app = require('./app');
const sequelize = require('./config/database');

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true }); // Ensures DB tables are in sync
    console.log('Database synced');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on 0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
}

startServer();
