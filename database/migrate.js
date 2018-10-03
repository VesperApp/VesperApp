// migrate raw data(json) into MySQL

const CategoriesData = require('./data/categories');
const GlassesData = require('./data/glasses');
const IngredientsData = require('./data/ingredients');
const DrinksData = require('./data/drinks');

const { Category, Glass, Ingredient, Drink } = require('./associate');

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
<<<<<<< HEAD
        return drinkModel.addIngredient(ingredient, { through: { measurement: '' } }).catch(err => console.log(err));
=======
        drinkModel.addIngredient(ingredient, { through: { measurement: '' } });
>>>>>>> code clean up
      }
    );
    executions.push(execution);
  }
  return Promise.all(executions);
};

<<<<<<< HEAD
=======
// const drinkData = DrinksData[0];
>>>>>>> code clean up
const migrateOneDrink = drinkData =>
  Drink.create({
    drink_name: drinkData.strDrink,
    picture_url: drinkData.strDrinkThumb,
<<<<<<< HEAD
  }).then(createdDrink =>
    addIngredientsForOneDrink(createdDrink, drinkData)
      .then(() => addGlassForOneDrink(createdDrink, drinkData))
      .then(() => addCategoryForOneDrink(createdDrink, drinkData))
  );
=======
  }).then(createdDrink => addIngredientsForOneDrink(createdDrink, drinkData));
>>>>>>> code clean up

const migrateDrinks = () => {
  const executions = [];
  DrinksData.forEach(drinkData => {
    const execution = migrateOneDrink(drinkData);
    executions.push(execution);
  });
  return Promise.all(executions).catch(err => console.log(err));
};

const migrateCategories = () =>
  Category.bulkCreate(CategoriesData.map(record => ({ category_name: record.strCategory })));
<<<<<<< HEAD
=======

>>>>>>> code clean up
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

<<<<<<< HEAD
module.exports = { migrateCategories, migrateGlasses, migrateIngredients, migrateDrinks };
=======
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
>>>>>>> code clean up
