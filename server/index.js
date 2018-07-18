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

// POST: migrate data from drinks.js into mongodb
app.post('/drinks/migrate', (req, res) => {
  drink.migrate((err, drinks) => {
    if (err) {
      res.status(500).send("POST /migrate failed");
    } else {
      res.status(201).send(`migrate drinks successfully`);
    }
  });
});

// TODO: POST: return drinks by given ingredients
app.post('/drinks', (req, res) => {});


// POST: migrate data from ingredient.js into mongodb
app.post('/ingredients/migrate', (req, res) => {
  ingredient.migrate((err, ingredients) => {
    if (err) {
      res.status(500).send(`POST /migrate failed, ${err}`);
    } else {
      res.status(201).send(`migrate ingredients successfully`);
    }
  });
});

// TODO: GET: return all ingredients
app.post('/ingredients', (req, res) => {});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
