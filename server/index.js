const express = require('express');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
const drink  = require('../database/drink.js');
const ingredient  = require('../database/ingredient.js');
const user  = require('../database/user.js');

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


app.post('/signUp',(req, res)=>{
  var q = req.body
  var password = req.body.password

  var hashPass = bcrypt.hashSync('password', 10);
    // change the object
    //q["password"] = hashPass
    // i got some bug in the bcrypt
    //console.log("See the hash",q)
    user.signUp(q)
    res.send(q)
})

app.post('/logIn',(req, res)=>{
  var q = req.body ;
  var email = req.body.email ;
  var password = req.body.email ;
  var password = req.body.password ;

  user.findOne(q,(err,data)=>{
    if(err){
      res.send("Login fail")
    }else{
      if(data != null ){
        res.send(data)
      }else{
        res.send("Login fail")
      }
      // bug with  bcrypt
      // bcrypt.compare(password,data.password,function(err,result){
      //   if(result == true){
      //     res.send(data)
      //   }else{
      //     res.send(err)
      //   }
      // })
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});



