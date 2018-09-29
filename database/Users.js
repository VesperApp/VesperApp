const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('User', {
  user_name: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
