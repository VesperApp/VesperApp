const mongoose = require('./db.js');

const userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String,
  email: String,
  favDrinks: Array
});

const User = mongoose.model('User', userSchema);

// TODO: Find specific user's favorite drinks
User.findFavDrinks = () => {};


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

