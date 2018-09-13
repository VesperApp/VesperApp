const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const User = sequelize.define('User', {
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;