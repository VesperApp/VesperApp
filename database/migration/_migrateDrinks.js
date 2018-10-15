const { Category, Glass, Ingredient, Drink } = require('../associate');

/**
 * Add category relationship for one drink.
 */
const addCategoryForOneDrink = (drinkModel, drinkData) => {
  const categoryName = drinkData.strCategory.trim();
  return Category.findOrCreate({ where: { category_name: categoryName } }).spread((category, created) =>
    category.addDrink(drinkModel)
  );
};

/**
 * Add glass relationship for one drink.
 */
const addGlassForOneDrink = (drinkModel, drinkData) => {
  // get glass from drinkData
  const glassName = drinkData.strGlass.trim(); // why the trim turns undefined into string?

  // query for glass
  return Glass.findOrCreate({ where: { glass_name: glassName } }).spread((glass, created) =>
    // add relationship to drink
    glass.addDrink(drinkModel)
  );
};

/**
 * This will insert records into DrinksIngredients table.
 */
const addIngredientsForOneDrink = (drinkModel, drinkData) => {
  const executions = [];
  for (let i = 1; i <= 15; i += 1) {
    const strIngredient = drinkData[`strIngredient${i}`].trim();
    const strMeasure = drinkData[`strMeasure${i}`].trim();
    if (strIngredient === '') {
      continue;
    }
    const execution = Ingredient.findOrCreate({ where: { ingredient_name: strIngredient } }).spread(
      (ingredient, created) => {
        ingredient.DrinkIngredient = { measurement: strMeasure };
        return drinkModel.addIngredient(ingredient, { through: { measurement: '' } }).catch(err => console.log(err));
      }
    );
    executions.push(execution);
  }
  return Promise.all(executions);
};

async function migrateOneDrink(drinkData) {
  const createdDrink = await Drink.create({
    drink_name: drinkData.strDrink,
    picture_url: drinkData.strDrinkThumb,
    instructions: drinkData.strInstructions,
  });

  await addIngredientsForOneDrink(createdDrink, drinkData);
  await addGlassForOneDrink(createdDrink, drinkData);
  await addCategoryForOneDrink(createdDrink, drinkData);
}

const migrateDrinks = drinksData => {
  const executions = [];
  drinksData.forEach(drinkData => {
    const execution = migrateOneDrink(drinkData);
    executions.push(execution);
  });
  return Promise.all(executions).catch(err => console.log(err));
};

module.exports = {
  migrateDrinks,
};
