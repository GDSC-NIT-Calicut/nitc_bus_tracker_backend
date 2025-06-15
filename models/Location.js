const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
  location_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // auto increment primary key
  },
  bus_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {                  // fixed typo
    type: DataTypes.FLOAT,     // better as float/decimal
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW  // default to current timestamp
  },
}, {
  tableName: 'Location',
  timestamps: false
});

Location.associate = models => {
  Location.belongsTo(models.Bus, { foreignKey: 'bus_id' });
};

module.exports = Location;
