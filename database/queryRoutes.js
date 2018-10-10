const sequelize = require('./sequelize');

const { Category, Glass, Ingredient, Drink } = require('./associate');

// get drinks from array of ingredients. input is an array composed of drink IDs: [22,39]
const getDrinksFromIngredients = async ingredients => {
  let ingredientQueryFragment = '';

  ingredients.forEach(ele => {
    if (ingredientQueryFragment === '') {
      ingredientQueryFragment = `IngredientID=${ele}`;
    } else {
      ingredientQueryFragment = `${ingredientQueryFragment} OR IngredientID=${ele}`;
    }
  });

  const results = await sequelize.query(
    `SELECT DrinkIngredients.DrinkID, Drinks.drink_name, count(*) 
      FROM DrinkIngredients INNER JOIN drinks 
      ON DrinkIngredients.DrinkID=Drinks.id 
      WHERE ${ingredientQueryFragment} 
      GROUP BY DrinkId ORDER BY count(*) DESC LIMIT 10;`,
    { model: Drink }
  );

  const finalResults = [];

  // add associations to results:
  await results.forEach(singleDrink => {
    finalResults.push(
      Drink.findById(singleDrink.dataValues.DrinkID, {
        include: [{ model: Category }, { model: Ingredient }, { model: Glass }],
      })
    );
  });

  return Promise.all(finalResults);
};

module.exports = {
  getDrinksFromIngredients,
};

// non async await pattern of 2nd half of query function:
/* 
  return sequelize
    .query(
      `SELECT DrinkIngredients.DrinkID, Drinks.drink_name, count(*) 
    FROM DrinkIngredients INNER JOIN drinks 
    ON DrinkIngredients.DrinkID=Drinks.id 
    WHERE ${ingredientQueryFragment} 
    GROUP BY DrinkId ORDER BY count(*) DESC LIMIT 10;`,
      { model: Drink }
    )
    .then(results => {
      const executions = [];
      results.forEach(ele => {
        executions.push(
          Drink.findById(ele.dataValues.DrinkID, {
            include: [{ model: Category }, { model: Ingredient }, { model: Glass }],
          })
        );
      });
      return Promise.all(executions);
    });
*/

/* manual test of query function:   
 
async function hi() {
   let hi2 = await getDrinksFromIngredients([22, 39]);
   await console.log('*********');
   await console.log(JSON.stringify(hi2));
   await console.log('*********');
   return hi2;
 }

 hi();

 */
