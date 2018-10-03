const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Category = sequelize.define('Category', {
  category_name: Sequelize.STRING,
});

module.exports = Category;
