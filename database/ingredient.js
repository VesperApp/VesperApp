const mongoose = require('./db.js');
const ingredietnsData = require('./data/ingredients.js');

const ingredientSchema = mongoose.Schema({
  strIngredient1: String
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// TODO: Return all ingredients
Ingredient.findAll = () => {};

// Migrate data from drinks.js into mongodb
Ingredient.migrate = (callback) => {
  Ingredient.collection.insert(ingredietnsData, (err, ingredients) => {
    callback(err, ingredients);
  })
}

module.exports = Ingredient;