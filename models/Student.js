const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  rollNo: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hostel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assigned_stop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_bus_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'Student',
  timestamps: false
});

  Student.associate = models => {
    Student.belongsTo(models.User, { foreignKey: 'user_id' });
    Student.belongsTo(models.Stop, { foreignKey: 'assigned_stop_id' });
    Student.belongsTo(models.Bus, { foreignKey: 'assigned_bus_id' });
  };

module.exports = Student;
