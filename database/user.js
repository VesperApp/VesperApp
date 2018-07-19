const mongoose = require('./db.js');

const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);

// TODO: Find specific user's favorite drinks and attach drink object to favDrinks array
User.findFavDrinks = (query, callback) => { //validate w/ findById
  // check to see if MongoIDkey  is unique
  if(!query._id === findById(query._id)) { // if unique
    // add to favorites array
    User.favDrinks = query;
    callback(null, User.favDrinks);
  }
};



module.exports = User;