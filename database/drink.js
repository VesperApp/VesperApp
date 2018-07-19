const mongoose = require('./db.js');
const drinksData = require('./data/drinks.js');

const drinkSchema = mongoose.Schema({
  idDrink: Number,
  strDrink: String,
  strVideo: String,
  strCategory: String,
  strIBA: String,
  strAlcoholic: String,
  strGlass: String,
  strInstructions: String,
  strDrinkThumb: String,
  strIngredient1: String,
  strIngredient2: String,
  strIngredient3: String,
  strIngredient4: String,
  strIngredient5: String,
  strIngredient6: String,
  strIngredient7: String,
  strIngredient8: String,
  strIngredient9: String,
  strIngredient10: String,
  strIngredient11: String,
  strIngredient12: String,
  strIngredient13: String,
  strIngredient14: String,
  strIngredient15: String,
  strMeasure1: String,
  strMeasure2: String,
  strMeasure3: String,
  strMeasure4: String,
  strMeasure5: String,
  strMeasure6: String,
  strMeasure7: String,
  strMeasure8: String,
  strMeasure9: String,
  strMeasure10: String,
  strMeasure11: String,
  strMeasure12: String,
  strMeasure13: String,
  strMeasure14: String,
  strMeasure15: String,
  dateModified: Date
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

// Migrate data from drinks.js into mongodb
Drink.migrate = (callback) => {
  if(Drink.collection.drop()){
    Drink.collection.insert(drinksData, (err, drinks) => {
      callback(err, drinks);
    })
  }
}

module.exports = Drink;