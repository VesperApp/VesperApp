const express = require('express');
const bodyParser = require('body-parser');
const drink  = require('../database/drink.js');
const ingredient  = require('../database/ingredient.js');

let app = express();

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
app.post('/drinks/migrate', (req, res) => {
  drink.migrate((err, drinks) => {
    if (err) {
      res.status(500).send("POST /migrate failed");
    } else {
      res.status(201).send(`migrate ${drinks.length} drinks successfully`);
    }
  });
});

// TODO: POST: return drinks by given ingredients
app.post('/drinks', (req, res) => {});


// POST: migrate data from ingredient.js into mongodb
app.post('/ingredients/migrate', (req, res) => {
  drink.migrate((err, ingredients) => {
    if (err) {
      res.status(500).send(`POST /migrate failed, ${err}`);
    } else {
      res.status(201).send(`migrate ${ingredients.length} ingredients successfully`);
    }
  });
});

// TODO: GET: return all ingredients
app.post('/ingredients', (req, res) => {});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});



