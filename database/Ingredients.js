const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Ingredient = sequelize.define('Ingredient', {
  ingredient_name: Sequelize.STRING,
  measurement: Sequelize.STRING,
});

module.exports = Ingredient;