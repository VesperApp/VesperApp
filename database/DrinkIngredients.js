const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const DrinkIngredient = sequelize.define('DrinkIngredient', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DrinkId: Sequelize.INTEGER,
  IngredientId: Sequelize.INTEGER,
  measurement: Sequelize.STRING,
});

//input is an array composed of drink IDs: [22,39]
const getDrinksFromIngredients = async ingredients => {
  let ingredientQueryFragment = '';

  ingredients.forEach(ele => {
    if (ingredientQueryFragment === '') {
      ingredientQueryFragment = `IngredientID=${ele}`;
    } else {
      ingredientQueryFragment = `${ingredientQueryFragment} OR IngredientID=${ele}`;
    }
  });

  return sequelize
    .query(
      `SELECT DrinkIngredients.DrinkID, Drinks.drink_name, count(*) 
  FROM DrinkIngredients INNER JOIN drinks 
  ON DrinkIngredients.DrinkID=Drinks.id 
  WHERE ${ingredientQueryFragment} 
  GROUP BY DrinkId ORDER BY count(*) DESC LIMIT 10;`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(results => results);
};
getDrinksFromIngredients([22, 39]);

module.exports = {
  DrinkIngredient,
  getDrinksFromIngredients,
};
