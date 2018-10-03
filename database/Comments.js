const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Comment = sequelize.define('Comment', {
  UserId: Sequelize.INTEGER,
  DrinkId: Sequelize.INTEGER,
  comment_text: Sequelize.STRING,
});

module.exports = Comment;
