const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Drink = sequelize.define('Drink', {
  drink_name: Sequelize.STRING,
  picture_url: Sequelize.STRING,
  creator_ID: Sequelize.INTEGER,
  instructions: Sequelize.STRING,
});

module.exports = Drink;
