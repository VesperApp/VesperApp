const mongoose = require('./db.js');


const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  emai: String,
  password: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);

// TODO: Find specific user's favorite drinks and attach drink object to favDrinks array
User.findFavDrinks = (query, callback) => {
  // check to see if MongoIDkey  is unique
  User.findById('5b50f96602b1850bd2fff872', (err, data) => {
    if (err) {
      throw err;
    } else {
      // User.favDrinks.push(data);
      callback(null, data)
    }
  })
};


User.removeFavDrinks = (query, callback) => {
  // locate the correct drink in favDrinksArray
  for(var i = 0; i < User.favDrinks.length; i++) {
    if(User.favDrinks[i] === query._id) {
      delete User.favDrinks[i];
    }
  }
  callback(null, User.favDrinks[i]);
}


module.exports = User;

/*
new schema

const userSchema = mongoose.Schema({   name: {type: String, unique: true, trim: true},   password: String,   email:{     type: String,     required: true,     unique : true,     trim: true   },   favDrinks: [] });
*/