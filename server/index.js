const express = require('express');
const bodyParser = require('body-parser');
const drink  = require('../database/drink.js');
const user  = require('../database/user.js');
const ingredient  = require('../database/ingredient.js');

// const user = require('../database/user.js')
const bcrypt = require('bcrypt');
const session = require('express-session');

let app = express();

app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// GET: (DEBUGGER route) return all drinks
app.get('/drinks', (req, res) => {

  drink.findAll((err, drinks) => {

    if (err) {
      res.status(500).send("GET /drinks failed");
    } else {
      res.status(200).send(drinks);
    }
  });
});

// GET: main search funtion: return all drinks by target ingredient list.
// client req (req.body) structured as object with ingredients as key. This function will convert the req object into an array.
// response is an array containing matched drink objects.
app.post('/drinksByIngredient', (req, res) => {
  drink.selectDrinkByigredients(Object.keys(req.body), function(err, data){
    if(err){
      console.log("QUERY error", error)
      res.send(err)
    }else{
      console.log("the drinks returned from the database", data)
      res.send(data)
    }
  })
});


// POST: (DEBUGGER route) migrate data from drinks.js into mongodb
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

//TODO: POST: add a favorite drink , someone clicks like then:
app.post('/user', (req,res) => {
  console.log('req is', req);
  user.addFavDrink(req.body, (err ,data) => {
    if (err) {
      console.log("POST /add favoriteDrink failed");
    } else {
      res.send(req.body);
    }
  });
})

//TODO: POST: remove a favorite drink
app.post('/user', (req, res) => {
  user.removeFavDrinks(req.body , (err, data) => {
    if (err) {
      console.log('Post /remove favoriteDrink failed')
    } else {
      res.send(data);
    }
  })
})


// TODO: GET: (DEBUGGER route) return all ingredients
app.get('/ingredients', (req, res) => {
  ingredient.findAll((err, drinks) => {
    if (err) {
      res.status(500).send("GET /ingredients failed");
    } else {
      res.status(200).send(drinks[0]);
    }
  });
});


app.listen(5000, function() {
  console.log('listening on port 3000!');
});


/************************************************************/
// Authentication routes here
/************************************************************/

//on signup - client req should have:
// req.body.username
// req.body.password
// req.body.email

//signup: if successful signup will return true. If erorr on signup will return database error.
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
        res.send(data)
       // createSession(req,res,req.body.username);
      }
    })
  });
})


//on login - client req should have:
// req.body.username
// req.body.password

//route login will return: true/false given username/password.
//if true a session will be created.
app.post('/login', function(req,res) {
  user.login(req, function(err,data) {
    if(err) {
      console.log("DATABASE RETURN FAIL")
      res.send(err);
    } else {
      bcrypt.compare(req.body.password, data[0].password, function(err, bcryptRes) {
          if(err) {
            console.log("BCRYPT ERR: ", err)
            res.send(err);
          } else {
            if(bcryptRes) {
              createSession(req,res,req.body.username)
            } else {
              console.log("BCRYPT RES: ", bcryptRes)
              res.send(bcryptRes);
            }
          }
      })
    }
  })
})

//logout: destroy session:
//returns true if session destroyed, flase if error.
app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
  // cannot access session here
  if(err) {
    console.log("Logout ERROR: ", err);
    res.send(false);

  }
    res.send(true);
  })
})

//create a session - helper function:
var createSession = function(req, res, userName) {
  req.session.regenerate(function(err) {
  // will have a new session here
    req.session.user = userName;
    res.send(true);
  })
};

//check if session is valid - helper functon:
var checkSession = function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.send("ERROR: need to login");
  }
}