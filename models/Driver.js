const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Driver = sequelize.define('Driver', {
  driver_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  license_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assigned_bus_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Driver',
  timestamps: false,
});

  Driver.associate = models => {
    Driver.belongsTo(models.User, { foreignKey: 'user_id' });
    Driver.belongsTo(models.Bus, { foreignKey: 'assigned_bus_id' });
  };

module.exports = Driver;
