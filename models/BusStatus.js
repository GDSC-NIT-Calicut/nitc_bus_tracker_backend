const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BusStatus = sequelize.define('BusStatus', {
  bus_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  eta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_stop_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'BusStatus',
  timestamps: false
});

module.exports = BusStatus;
