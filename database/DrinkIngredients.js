const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const DrinkIngredient = sequelize.define('DrinkIngredient', {
  DrinkId: Sequelize.INTEGER,
  IngredientId: Sequelize.INTEGER,
  measurement: Sequelize.STRING,
});

module.exports = DrinkIngredient;
