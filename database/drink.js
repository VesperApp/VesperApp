const mongoose = require('./db.js');

const drinkSchema = mongoose.Schema({
  name: String,
  category: String,
  alcoholic: String,
  glass: String,
  recipe: String,
  image: String,
  ingredients: Object,
  measures: Object
});

const Drink = mongoose.model('Drink', drinkSchema);

// Return all drinks
Drink.findAll = (callback) => {
  Drink.find({}, (err, drinks) => {
    callback(err, drinks);
  });
};
// TODO: Return drinks that match exactly with given ingredients
Drink.findByIngredients = (ingredients) => {
  // ingredients is an object

};

module.exports = Drink;