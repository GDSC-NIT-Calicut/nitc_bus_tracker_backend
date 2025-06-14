require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes/index');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;
