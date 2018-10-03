// migrate raw data(json) into MySQL

const CategoriesData = require('./data/categories');
const GlassesData = require('./data/glasses');
const IngredientsData = require('./data/ingredients');
const DrinksData = require('./data/drinks');

const { Category, Glass, Ingredient, Drink } = require('./associate');

/**
 * This will also insert records into DrinksIngredients table.
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
        drinkModel.addIngredient(ingredient, { through: { measurement: '' } });
      }
    );
    executions.push(execution);
  }
  return Promise.all(executions);
};

// const drinkData = DrinksData[0];
const migrateOneDrink = drinkData =>
  Drink.create({
    drink_name: drinkData.strDrink,
    picture_url: drinkData.strDrinkThumb,
  }).then(createdDrink => addIngredientsForOneDrink(createdDrink, drinkData));

const migrateDrinks = () => {
  const executions = [];
  DrinksData.forEach(drinkData => {
    const execution = migrateOneDrink(drinkData);
    executions.push(execution);
  });
  return Promise.all(executions);
};

const migrateCategories = () =>
  Category.bulkCreate(CategoriesData.map(record => ({ category_name: record.strCategory })));

const migrateGlasses = () => Glass.bulkCreate(GlassesData.map(record => ({ glass_name: record.strGlass })));

const migrateIngredients = () =>
  Ingredient.bulkCreate(IngredientsData.map(record => ({ ingredient_name: record.strIngredient1 })));

/**
 * Execute the migration.
 */
migrateCategories()
  .then(migrateGlasses)
  .then(migrateIngredients)
  .then(migrateDrinks);

module.exports = { migrateCategories, migrateGlasses, migrateIngredients };

/*
  *Add glass relationship for one drink 
*/
// const addGlassForOneDrink = (drinkModel, drinkData) => {
//   //get glass from drinkData
//   const glassName = drinkData.strGlass.trim(); //why the trim turns undefined into string?

//   //query for glass
//   return Glass.findOrCreate({ where: { glass_name: glassName } })
//     .spread((glass, created) => {
//       //add relationship to drink
//       glass.addDrinks([drinkModel]);
//     })
//     .catch(e => console.log(e));
// };
