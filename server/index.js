const express = require('express');
const bodyParser = require('body-parser');

const { getIngredientsList, getDrinksFromIngredients } = require('../database/queryRoutes.js');

// const user = require('../database/user.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../client/dist`));

// Return all ingredients, precursor to search function
app.get('/ingredients', async (req, res) => {
  try {
    const ingredientsArray = await getIngredientsList();
    res.status(200).send(ingredientsArray);
  } catch (e) {
    res.status(500).send('GET /ingredients failed');
  }
});

// GET: main search funtion: return all drinks by target ingredient list.
// client req (req.body) structured as object with ingredients as key. This function will convert the req object into an array.
// response is an array containing matched drink objects.
app.post('/drinksByIngredient', async (req, res) => {
  console.log('this is the req');
  console.log(req.body);
  try {
    const response = await getDrinksFromIngredients(Object.values(req.body));
    res.send(response);
  } catch (e) {
    res.status(500).send('GET /drinks by ingredients failed');
  }
});

if (process.env.node_env !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}!`);
  });
} else {
  // for jest testing
  module.exports = app;
}
