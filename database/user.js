const mongoose = require('./db.js');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {type: String, unique: true, trim: true},
  password: String,
  email:{
    type: String,
    required: true,
    unique : true,
    trim: true
  },
  favDrinks: []
});

const User = mongoose.model('User', userSchema);

// TODO: Find specific user's favorite drinks
User.findFavDrinks = () => {};

User.signUp = (userObject) =>{
   var user_sign = new User(userObject);
   user_sign.save((err)=>{
    if(err){
      console.log(err)
    }else{
      console.log("the user collection have save");
    }
   })
}

User.login = function(email,callback){
    // ingredients is an object

    User.findOne(email,(err,data)=>{
      if(err){
        console.log("Find an error",err);
        callback(null, error)
      }else{
        callback(null, data);
      }
    })
}

module.exports = User;