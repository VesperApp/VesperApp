
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

//TODO: POST: favorite drink
app.post('/user', (req,res) => {
  let hardCodeDrink = {"_id":{"$oid":"5b4d76daf2fc771b06ef85fa"},"idDrink":{"$numberInt":"15346"},"strDrink":"155 Belmont","strVideo":"","strCategory":"Cocktail","strIBA":"","strAlcoholic":"Alcoholic","strGlass":"White wine glass","strInstructions":"Blend with ice. Serve in a wine glass. Garnish with carrot.","strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg","strIngredient1":"Dark rum","strIngredient2":"Light rum","strIngredient3":"Vodka","strIngredient4":"Orange juice","strIngredient5":"","strIngredient6":"","strIngredient7":"","strIngredient8":"","strIngredient9":"","strIngredient10":"","strIngredient11":"","strIngredient12":"","strIngredient13":"","strIngredient14":"","strIngredient15":"","strMeasure1":"1 shot ","strMeasure2":"2 shots ","strMeasure3":"1 shot ","strMeasure4":"1 shot ","strMeasure5":" ","strMeasure6":" ","strMeasure7":" ","strMeasure8":" ","strMeasure9":" ","strMeasure10":"","strMeasure11":"","strMeasure12":"","strMeasure13":"","strMeasure14":"","strMeasure15":"","dateModified":{"$date":{"$numberLong":"1475685388000"}},"__v":{"$numberInt":"0"}};

  user.findFavDrinks(hardCodeDrink, (err ,data) => {
    if (err) {
      console.log("POST /add favoriteDrink failed");
    } else {
      res.send(data);
    }
  });
})

// TODO: POST: return drinks by given ingredients
app.post('/drinks', (req, res) => {});


// POST: migrate data from ingredient.js into mongodb **** DELETE --> this function merged itno Drink Migration:
app.get('/ingredients/migrate', (req, res) => {
  //This function merged into Drink migration. see above.
});

// TODO: GET: return all ingredients
app.get('/ingredients', (req, res) => {
  ingredient.findAll((err, drinks) => {
    if (err) {
      res.status(500).send("GET /ingredients failed");
    } else {
      res.status(200).send(drinks);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});



