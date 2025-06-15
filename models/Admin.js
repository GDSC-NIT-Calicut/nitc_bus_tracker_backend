const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('Admin', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
}, {
  tableName: 'Admin',
  timestamps: false
});

module.exports = Admin;
