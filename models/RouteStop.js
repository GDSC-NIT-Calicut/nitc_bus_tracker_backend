const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RouteStop = sequelize.define('RouteStop', {
  route_stop_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  route_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stop_order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stop_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eta_offset_minuts: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'RouteStop',
  timestamps: false
});

  RouteStop.associate = models => {
    RouteStop.belongsTo(models.Route, { foreignKey: 'route_id' });
    RouteStop.belongsTo(models.Stop, { foreignKey: 'stop_id' });
  };

module.exports = RouteStop;
