const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stop = sequelize.define('Stop', {
  stop_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lattitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'Stop',
  timestamps: false
});

  Stop.associate = models => {
    Stop.hasMany(models.Student, { foreignKey: 'assigned_stop_id' });
    Stop.hasMany(models.RouteStop, { foreignKey: 'stop_id' });
  };

module.exports = Stop;
