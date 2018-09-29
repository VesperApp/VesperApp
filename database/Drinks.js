const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Drink = sequelize.define('Drink', {
  drink_name: Sequelize.STRING,
  picture_url: Sequelize.STRING,
  creator_ID: Sequelize.INTEGER,
});

module.exports = Drink;
