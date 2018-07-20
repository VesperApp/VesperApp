const mongoose = require('./db.js');

const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  email: String,
  password: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);


User.register = (req, cb) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  User.create({name: username,
    password: password,
    email: email}, function(err,data) {
      if(err) {
        console.log("Database user save error: ",err)
        cb(err, null)
      }
      else {
        cb(null, data)
      }
  })
};

// TODO: Find specific user's favorite drinks and attach drink object to favDrinks array
User.findFavDrinks = (query, callback) => {
  // check to see if MongoIDkey  is unique

  User.findById(query._id, (err, data) => {
    if (err) {
      throw err;
    } else {
      // use .set() to modify docs
      User.set({ favDrinks: []})
      User.save( (err, update) => {
        if(err) {
          throw err;
        } else {
          res.send(update);
        }
      })
      callback(null, data)
    }
  })
};

// User.addFavDrink = (query, callback) {}

User.removeFavDrinks = (query, callback) => {
  // locate the correct drink in favDrinksArray
  User.findById('5b50f96602b1850bd2fff872', (err, data) => {
    if (err) {
      throw err;
    } else {
      // remove object from array
      //
      callback(null, data)
    }
  })

}


module.exports = User;

/*
new schema
const userSchema = mongoose.Schema({   name: {type: String, unique: true, trim: true},   password: String,   email:{     type: String,     required: true,     unique : true,     trim: true   },   favDrinks: [] });
*/
