const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Favorite = sequelize.define('Favorite', {
  UserId: Sequelize.INTEGER,
  DrinkId: Sequelize.INTEGER,
});

module.exports = Favorite;
