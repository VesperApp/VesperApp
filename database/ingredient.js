const mongoose = require('./db.js');
const ingredientsData = require('./data/ingredients.js');

const ingredientSchema = mongoose.Schema({
  strIngredient1: String
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// TODO: Return all ingredients
Ingredient.findAll = (callback) => {
  Ingredient.find({}, (err, drinks) => {
    callback(err, drinks);
  });
};

// Migrate data from drinks.js into mongodb
Ingredient.migrate = (callback) => {
  Ingredient.collection.drop();
  Ingredient.collection.insert(ingredientsData, (err, ingredients) => {
    callback(err, ingredients);
  })
}

module.exports = Ingredient;