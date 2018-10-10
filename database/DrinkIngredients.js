const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const DrinkIngredient = sequelize.define('DrinkIngredient', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DrinkId: Sequelize.INTEGER,
  IngredientId: Sequelize.INTEGER,
  measurement: Sequelize.STRING,
});

module.exports = {
  DrinkIngredient,
};
