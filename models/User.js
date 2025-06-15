const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  hostel: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.BIGINT,
  },
  photo_url: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'User',
  timestamps: false
});

  User.associate = models => {
    User.hasOne(models.Student, { foreignKey: 'user_id' });
    User.hasOne(models.Driver, { foreignKey: 'user_id' });
    User.hasMany(models.Feedback, { foreignKey: 'user_id' });
    User.hasMany(models.Notification, { foreignKey: 'user_id' });
  };

module.exports = User;
