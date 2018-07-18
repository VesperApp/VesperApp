var express = require('express');
var bodyParser = require('body-parser');
var { drink, ingredient }  = require('../database/index');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// GET: return all drinks
app.get('/drinks', (req, res) => {
  drink.findAll((err, drinks) => {
    if(err) {
      res.status(500).send("Get did not work");
    } else {
      res.status(200).send(drinks);
    }
  });
});

// POST: return drinks by given ingredients
app.post('/drinks', (req, res) => {});

// GET: return all ingredients
app.post('/ingredients', (req, res) => {});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
