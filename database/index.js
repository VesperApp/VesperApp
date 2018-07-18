let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vesper');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we have connection to mongodb'));

let drinkSchema = mongoose.Schema({
  name: String,
  category: String,
  alcoholic: String,
  glass: String,
  recipe: String,
  image: String,
  ingredients: Object,
  measures: Object
});

let ingredientSchema = mongoose.Schema({
  name: String,
  type: String
});

// TODO: User schema
let userSchema = mongoose.Schema({});

let Drink = mongoose.model('Drink', drinkSchema);
let Ingredient = mongoose.model('Ingredient', ingredientSchema);
let User = mongoose.model('User', userSchema);

// Return all drinks
Drink.findAll = (callback) => {
  Drink.find({}, (err, drinks) => {
    callback(err, drinks);
  });
};
// Return drinks that match exactly with given ingredients
Drink.findByIngredients = (ingredients) => {
  // ingredients is an object

};

module.exports.drink = Drink;
module.exports.ingredient = Ingredient;
