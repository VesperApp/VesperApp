const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const user = require('../database/Users.js');
const { getIngredientsList, getDrinksFromIngredients } = require('../database/queryRoutes.js');

// const user = require('../database/user.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../client/dist`));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

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

// TODO: POST: add a favorite drink , someone clicks like then:
app.post('/user/addFavDrink', (req, res) => {
  user.addFavDrink(req.body, (err, data) => {
    if (err) {
      console.log('POST /add favoriteDrink failed');
    } else {
      console.log('add fav drink post sent ');
      res.status(200).send(data);
    }
  });
});

// TODO: POST: remove a favorite drink
app.post('/user/removeFavDrink', (req, res) => {
  user.removeFavDrinks(req.body, (err, data) => {
    if (err) {
      console.log('Post removeFavDrink failed');
    } else {
      res.status(200).send(data);
    }
  });
});

/** ********************************************************* */
// Authentication routes here
/** ********************************************************* */

// on signup - client req should have:
// req.body.username
// req.body.password
// req.body.email

// signup: if successful signup will return true. If erorr on signup will return database error.
app.post('/signup', function(req, res) {
  // create a hash:
  bcrypt.hash(req.body.password, 1, function(err, hash) {
    // reset the req password as the hash
    req.body.password = hash;
    // send req to save user to database
    user.register(req, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
        // createSession(req,res,req.body.username);
      }
    });
  });
});

// on login - client req should have:
// req.body.username
// req.body.password

// route login will return: true/false given username/password.
// if true a session will be created.
app.post('/login', function(req, res) {
  user.login(req, function(err, data) {
    if (err) {
      console.log('DATABASE RETURN FAIL');
      res.send(err);
    } else {
      bcrypt.compare(req.body.password, data[0].password, function(err, bcryptRes) {
        if (err) {
          console.log('BCRYPT ERR: ', err);
          res.send(err);
        } else {
          if (bcryptRes) {
            createSession(req, res, req.body.username);
          } else {
            console.log('BCRYPT RES: ', bcryptRes);
            res.send(bcryptRes);
          }
        }
      });
    }
  });
});

// logout: destroy session:
// returns true if session destroyed, flase if error.
app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    // cannot access session here
    if (err) {
      console.log('Logout ERROR: ', err);
      res.send(false);
    }
    res.send(true);
  });
});

// create a session - helper function:
let createSession = function(req, res, userName) {
  req.session.regenerate(function(err) {
    // will have a new session here
    req.session.user = userName;
    res.send(true);
  });
};

// check if session is valid - helper functon:
const checkSession = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send('ERROR: need to login');
  }
};

if (process.env.node_env !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}!`);
  });
} else {
  // for jest testing
  module.exports = app;
}
<<<<<<< HEAD
=======
//
>>>>>>> code clean up
