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
  });
};


User.login = (req, cb) => {
  let username = req.body.name;

  User.find({name: username}, function(err, data){
    if(err) {
      cb(err,null);
    } else {
      cb(null, data);
    }
  })
}

User.addFavDrink = (postData, cb) => {
  const {username, drink} = postData;
  User.findOneAndUpdate({name: username},
    {$push: {favDrinks: drink}},
    function (err, data) {
      if (err) {
        console.log("err on addFavDrink ");
        cb(err, null);
      } else {
        console.log("Sucess");
        console.log("fav drinks array is ", data.favDrinks);
        cb(null, data.favDrinks);
      }
  });
};

User.removeFavDrinks = (query, callback) => {
  // locate the correct drink in favDrinksArray
  User.update({"_id": req.body._id}, {"$pull": {favDrinks: {_id:req.body._id}}})
}

module.exports = User;


/*
new schema
const userSchema = mongoose.Schema({   name: {type: String, unique: true, trim: true},   password: String,   email:{     type: String,     required: true,     unique : true,     trim: true   },   favDrinks: [] });
*/
