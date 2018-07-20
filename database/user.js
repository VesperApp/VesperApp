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

  User.find({name: username}, function(err, data){
    if(err) {
      cb(err,null);
    } else {
      cb(null, data);
    }
  })
}

User.edit = (newParam) => {
  User.findById('5b50e39cc98901096805e2aa',function(err,data){
    console.log(data);
    data.password = "this is the new password";
    data.save(function(err,updatedata) {
      console.log(updatedata);
    })
  })
}


module.exports = User;

User.edit("HI");
