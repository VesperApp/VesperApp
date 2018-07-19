const mongoose = require('./db.js');

const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);

// TODO: Find specific user's favorite drinks and attach drink object to favDrinks array
User.findFavDrinks = (query, callback) => {
  // check to see if MongoIDkey  is unique
    // if unique
      // add to favorites array
    // if not unique
      // throw err?

    // call back
      // return the favorte drink array

};


module.exports = User;