const sequelize = require('./sequelize');
const User = require('./Users');

const Drink = require('./Drinks');
const Category = require('./Categories');
const Glass = require('./Glasses');
const Ingredient = require('./Ingredients');
const { DrinkIngredient } = require('./DrinkIngredients');

const Favorite = require('./Favorites');

User.hasMany(Drink, { foreignKey: 'creator_ID' });
// Drink.belongsTo(User, { foreignKey: 'creator_ID' });

Category.hasMany(Drink, { foreignKey: 'category_ID' });
Drink.belongsTo(Category, { foreignKey: 'category_ID' });

Glass.hasMany(Drink, { foreignKey: 'glass_ID' });
Drink.belongsTo(Glass, { foreignKey: 'glass_ID' });

Drink.belongsToMany(Ingredient, { through: { model: DrinkIngredient, unique: false } });
Ingredient.belongsToMany(Drink, { through: { model: DrinkIngredient, unique: false } });

/**
 * Don't sync when running tests, otherwise it might affect the test results.
 */
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync();
}

module.exports = {
  sequelize,
  User,
  Drink,
  Category,
  Glass,
  Ingredient,
  Favorite,
  DrinkIngredient,
};
