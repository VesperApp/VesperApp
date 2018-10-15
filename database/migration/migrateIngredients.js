const IngredientsData = require('../data/ingredients');
const { Ingredient } = require('../associate');

(function migrateIngredients(ingredientsData) {
  Ingredient.bulkCreate(ingredientsData.map(record => ({ ingredient_name: record.strIngredient1 })));
})(IngredientsData);
