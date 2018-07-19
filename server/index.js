
const express = require('express');
const bodyParser = require('body-parser');
const drink  = require('../database/drink.js');
const ingredient  = require('../database/ingredient.js');

const user = require('../database/user.js')
const bcrypt = require('bcrypt');
const session = require('express-session');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// GET: return all drinks
app.get('/drinks', (req, res) => {

  drink.findAll((err, drinks) => {

    if (err) {
      res.status(500).send("GET /drinks failed");
    } else {
      res.status(200).send(drinks);
    }
  });

});

// GET: return all drinks by ingredient list
app.post('/drinksByIngredient', (req, res) => {
 // var qr = req.body // to get the params
 // how ll got value in the get method ?

  var q = {strDrink:/155 Belm/ } // like
  drink.selectDrinkByigredients(q, function(err, data){
    if(err){
      console.log("The error", error)
    }else{
      console.log("the data form database",data)
      res.send(data)
    }
  })
});


// POST: migrate data from drinks.js into mongodb
app.post('/data/reset', (req, res) => {
  drink.migrate((err, drinks) => {
    if (err) {
      res.status(500).send("POST /drink migration failed");
    } else {
        ingredient.migrate((err, ingredients) => {
          if (err) {
            res.status(500).send(`POST /migrate failed. Ensure drink data (/drinks) has been successfully loaded first. Error: ${err}`);
          } else {
            res.status(201).send(`SUCCESS migrated drinks and ingredients data successfully!`);
          }
        });
    }
  });
});

// TODO: POST: return drinks by given ingredients
app.post('/drinks', (req, res) => {});



// TODO: GET: return all ingredients
app.get('/ingredients', (req, res) => {
  ingredient.findAll((err, drinks) => {
    if (err) {
      res.status(500).send("GET /ingredients failed");
    } else {
      res.status(200).send(drinks[0]);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


/************************************************************/
// Authentication routes here
/************************************************************/

app.post('/signup',function(req,res) {

  //create a hash:
  bcrypt.hash(req.body.password, 1, function(err, hash) {

    //reset the req password as the hash
    req.body.password = hash;

    //send req to save user to database
    user.register(req,function(err,data) {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    })

  });

})


app.post('/login', function(req,res) {
  user.login(req, function(err,data) {
    if(err) {
      console.log("DATABASE RETURN FAIL")
      res.send(err);
    } else {
      bcrypt.compare(req.body.password, data[0].password, function(err, bcryptRes) {
          if(err) {
            console.log("BCRYPT ERR")
            res.send(err);
          } else {
            console.log("BCRYPT RES: ", bcryptRes)
            res.send(bcryptRes);
          }
      });
    }
  })
})

