const sequelize = require('./sequelize');
const Sequelize = require('sequelize');

const Drink = sequelize.define('Drink', {
  drink_name: Sequelize.STRING,
  picture_url: Sequelize.STRING,
  creator_ID: Sequelize.INTEGER,
});

const Catagory = sequelize.define('Catagory',{
  catagory_name: Sequelize.STRING
})

const Glass = sequelize.define('Glass',{
  glass_name: Sequelize.STRING
})

const Ingredient = sequelize.define('Ingredient',{
  ingredient_name: Sequelize.STRING
})

module.exports = {
  Drink: Drink,
  Catagory: Catagory,
  Glass: Glass,
  Ingredient:Ingredient
}
