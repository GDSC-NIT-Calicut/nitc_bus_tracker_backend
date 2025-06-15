const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bus_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.NOW,
    allowNull: false
  },

  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

}, {
  tableName: 'Notification',
  timestamps: false
});
  Notification.associate = models => {
    Notification.belongsTo(models.User, { foreignKey: 'user_id' });
    Notification.belongsTo(models.Bus, { foreignKey: 'bus_id' });
  };

module.exports = Notification;
