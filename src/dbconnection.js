const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize('newcompany', 'root', 'anmol@369', {
    host: '0.0.0.0', 
    dialect: 'mysql',
  });

module.exports = { sequelize };