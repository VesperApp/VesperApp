const mongoose = require('./db.js');


const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  emai: String,
  password: String,
  email: String,
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
      // push the data into favDrinks array
      // User.favDrinks.push(data);
      callback(null, data)
    }
  })
};


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

<<<<<<< HEAD
const userSchema = mongoose.Schema({   name: {type: String, unique: true, trim: true},   password: String,   email:{     type: String,     required: true,     unique : true,     trim: true   },   favDrinks: [] });
*/
=======

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


User.login = (req, cb) => {
  let username = req.body.username;
  // let username = req;

  User.find({name: username}, function(err, data){
    if(err) {
      cb(err,null);
    } else {
      cb(null, data);
    }
  })
}


module.exports = User;

>>>>>>> a39de5383ab3bd2b13ff82f45661fcc6613513d2
