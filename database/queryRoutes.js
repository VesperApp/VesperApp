const sequelize = require('./sequelize');

const { Category, Glass, Ingredient, Drink } = require('./associate');

/* ****************** ******************
get drinks from array of ingredients. 
input is an array composed of drink IDs: [22,39]
****************** ****************** */
const getDrinksFromIngredients = async ingredients => {
  let ingredientQueryFragment = '';
  console.log(ingredients);
  ingredients.forEach(ele => {
    if (ingredientQueryFragment === '') {
      ingredientQueryFragment = `IngredientID=${ele}`;
    } else {
      ingredientQueryFragment = `${ingredientQueryFragment} OR IngredientID=${ele}`;
    }
  });

  const results = await sequelize.query(
    `SELECT DrinkIngredients.DrinkID, Drinks.drink_name, Drinks.instructions, count(*) 
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

/* ****************** ******************
get object of unique ingredients
****************** ****************** */
const getIngredientsList = async () => {
  //   Ingredient.findAll({
  //     attributes: ['id', 'ingredient_name'],
  //   }).then(ele => console.log(ele));

  const ingredientArr = await sequelize.query('SELECT ingredient_name,id FROM `ingredients`', {
    type: sequelize.QueryTypes.SELECT,
  });

  const ingredientHash = await {};

  await ingredientArr.forEach(ele => {
    const { ingredient_name, id } = ele;
    ingredientHash[ingredient_name] = id;
  });

  return ingredientHash;
};

module.exports = {
  getDrinksFromIngredients,
  getIngredientsList,
};
