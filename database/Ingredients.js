const Sequelize = require('sequelize');
const sequelize = require('./sequelize');


const Ingredient = sequelize.define('Ingredient', {
  ingredient_name: Sequelize.STRING,
});

module.exports = Ingredient;
