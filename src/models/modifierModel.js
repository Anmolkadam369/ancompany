const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconnection');

const Modifier = sequelize.define('Modifier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  selectedAddOns: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Synchronize the model with the database
Modifier.sync().then(() => {
  console.log('Modifier table created successfully');
});

module.exports = Modifier;