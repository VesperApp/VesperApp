// migrate raw data(json) into MySQL

const CategoriesData = require('./data/categories');
const GlassesData = require('./data/glasses');
const IngredientsData = require('./data/ingredients');

const Category = require('./Categories');
const Glass = require('./Glasses');
const Ingredient = require('./Ingredients');

const migrateCategories = () => Category.bulkCreate(
  CategoriesData.map(
    record => ({ category_name: record.strCategory }),
  ),
);

const migrateGlasses = () => Glass.bulkCreate(
  GlassesData.map(
    record => ({ glass_name: record.strGlass }),
  ),
);

const migrateIngredients = () => Ingredient.bulkCreate(
  IngredientsData.map(
    record => ({ ingredient_name: record.strIngredient1 }),
  ),
);

module.exports = { migrateCategories, migrateGlasses, migrateIngredients };
