const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bus = sequelize.define('Bus', {
  bus_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  license_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_route_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Bus',
  timestamps: false
});

  Bus.associate = models => {
    Bus.hasMany(models.RouteStop, { foreignKey: 'assigned_route_id' });
    Bus.hasMany(models.Feedback, { foreignKey: 'bus_id' });
    Bus.hasMany(models.Notification, { foreignKey: 'bus_id' });
    Bus.hasMany(models.Location, { foreignKey: 'bus_id' });
  };

module.exports = Bus;

