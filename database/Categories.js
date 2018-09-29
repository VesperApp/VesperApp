const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Category = sequelize.define('Catagory',{
  catagory_name: Sequelize.STRING
});

module.exports = Category;