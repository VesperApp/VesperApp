const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

sequelize.define('Favorite', {
  UserId: Sequelize.INTEGER,
  DrinkId: Sequelize.INTEGER,
});

