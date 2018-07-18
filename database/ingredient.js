const mongoose = require('./db.js');

const ingredientSchema = mongoose.Schema({
  name: String,
  type: String
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);


// TODO: Return all ingredients
Ingredient.findAll = () => {};

module.exports = Ingredient;