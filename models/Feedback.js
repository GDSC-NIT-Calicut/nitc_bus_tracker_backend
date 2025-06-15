const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
  feedback_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
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
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'Feedback',
  timestamps: false
});

  Feedback.associate = models => {
    Feedback.belongsTo(models.User, { foreignKey: 'user_id' });
    Feedback.belongsTo(models.Bus, { foreignKey: 'bus_id' });
  };

module.exports = Feedback;
