const sequelize = require('./sequelize');
const User = require('./Users');

const Drink = require('./Drinks');
const Category = require('./Categories');
const Glass = require('./Glasses');
const Ingredient = require('./Ingredients');
const DrinkIngredient = require('./DrinkIngredients');

const Favorite = require('./Favorites');

// User.belongsToMany(Drink, { through: 'Favorites' });
User.hasMany(Drink, { foreignKey: 'creator_ID' });
// Drink.belongsToMany(User, { through: 'Favorites' });

Category.hasMany(Drink, { foreignKey: 'category_ID' });
Glass.hasMany(Drink, { foreignKey: 'glass_ID' });

Drink.belongsToMany(Ingredient, { through: DrinkIngredient });
Ingredient.belongsToMany(Drink, { through: DrinkIngredient });

sequelize.sync();

module.exports = {
  sequelize,
  User,
  Drink,
  Category,
  Glass,
  Ingredient,
  Favorite,
};
