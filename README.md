# VesperApp

//Todo

Mock up:
https://app.moqups.com/edai/Pkc8xLkcty/edit/page/ad64222d5


[X] create main [App] component

  [X] create  [Header] component
    [X] create  [Login] component
    [X] create input [SignUp] component

  [X] create user [Search] input component
    [X] create selected [IngredientList] component/submit button

  [X] create cocktail [ResultsList] component / user [FavoriteList] component
    [X] create  [CocktailDetails] component

  [] create input [Footer] component

[] css file for basic style

//Julio

[] database: create query to return drinks by given ingredients


// TODO: Return drinks that match exactly with given ingredients
Drink.selectDrinkByigredients = function(query,callback){
    // ingredients is an object
    Drink.find(query,function(err,drinks){
      if(err){
        console.log("Find an error",err);
        callback(null, error)
      }else{
        callback(null, drinks);
      }
    })
}

// GET: return all drinks by ingredient list
app.get('/drinksByIngredient', (req, res) => {
  var q =  {strDrink:"155 Belmont"}
  drink.selectDrinkByigredients(q, function(err, data){
    if(err){
      console.log("The error", error)
    }else{
      console.log("the data form database",data)
      res.send(data)
    }
  })
});
