const mongoose = require('./db.js');
const ingredientsData = require('./data/ingredients.js');
const drinksData = require('./data/drinks.js');

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
  if(Ingredient.collection.drop()) {

    var uniqIngredients = {};

    drinksData.forEach(function(ele) {
      uniqIngredients[ele['strIngredient1']]=1;
      uniqIngredients[ele['strIngredient2']]=1;
      uniqIngredients[ele['strIngredient3']]=1;
      uniqIngredients[ele['strIngredient4']]=1;
      uniqIngredients[ele['strIngredient5']]=1;
      uniqIngredients[ele['strIngredient6']]=1;
      uniqIngredients[ele['strIngredient7']]=1;
      uniqIngredients[ele['strIngredient8']]=1;
      uniqIngredients[ele['strIngredient9']]=1;
      uniqIngredients[ele['strIngredient10']]=1;
      uniqIngredients[ele['strIngredient11']]=1;
      uniqIngredients[ele['strIngredient12']]=1;
      uniqIngredients[ele['strIngredient13']]=1;
      uniqIngredients[ele['strIngredient14']]=1;
      uniqIngredients[ele['strIngredient15']]=1;
    })
    Ingredient.collection.insert(uniqIngredients, (err, ingredients) => {
      callback(err, ingredients);
    })
  }
}

module.exports = Ingredient;