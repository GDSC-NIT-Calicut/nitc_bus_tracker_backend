const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define('Route', {
  route_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  operational_start_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  operational_end_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'Route',
  timestamps: false
});

  Route.associate = models => {
    Route.hasMany(models.RouteStop, { foreignKey: 'route_id' });
    Route.hasMany(models.Bus, { foreignKey: 'assigned_route_id' });
  };

module.exports = Route;
