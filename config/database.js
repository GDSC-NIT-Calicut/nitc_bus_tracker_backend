const { Sequelize } = require('sequelize');
require('dotenv').config();

function nowIST() {
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in ms
  const istTime = new Date(Date.now() + istOffset)
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);
  return `${istTime} IST`;
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: (msg) => {
      console.log(`[${nowIST()}] ${msg}`);
    }
  }
);

module.exports = sequelize;

