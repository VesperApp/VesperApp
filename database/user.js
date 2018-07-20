const mongoose = require('./db.js');


const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  email: String,
  password: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);

//

// TODO: Find specific user's favorite drinks and attach drink object to favDrinks array
User.findFavDrinks = (query, callback) => {
  // check to see if MongoIDkey  is unique
  User.findById("5b50f96602b1850bd2fff872", (err, drink) => { // just use find?
  // User.findById(req._id, (err, drink) => {
    if(err) {console.log('there is an ', err)};
    console.log('drink is', drink);
    drink.name = 'joeytest';
    drink.favDrinks[1] = 'secondTestDrink'
    drink.save(function(err, favDrink) {
      if(err) {
        console.log('the save did not work', err);
      } else {
        // res.send(favDrink) // error saying res not defined??
      }
    });
  })
};
User.findFavDrinks();

User.removeFavDrinks = (query, callback) => {
  // locate the correct drink in favDrinksArray
  User.favDrinks[0].deleteOne()

}


module.exports = User;

/*
new schema

const userSchema = mongoose.Schema({   name: {type: String, unique: true, trim: true},   password: String,   email:{     type: String,     required: true,     unique : true,     trim: true   },   favDrinks: [] });
*/