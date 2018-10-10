// mysql2 doing dynamic lazy require of encodings ,but Jest not being able to handle this.
// So we need to add the following code. (reference: https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js)
const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');

iconv.encodings = encodings;
//

const DrinksData = require('../data/drinks');
const CategoriesData = require('../data/categories');
const GlassesData = require('../data/glasses');
const IngredientsData = require('../data/ingredients');
const { sequelize, Drink, Category, Glass, Ingredient, DrinkIngredient } = require('../associate');
const { migrateCategories, migrateGlasses, migrateIngredients, migrateDrinks } = require('../migrate');
const { truncateTables, endConnection, countDrinkIngredients } = require('./util');
const { getDrinksFromIngredients } = require('../queryRoutes');

jest.setTimeout(30000);
beforeAll(() => truncateTables());
afterAll(() => endConnection());

describe('check the environment', () => {
  test('should be running on test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});

/**
 * Test migration functions: migrateCategories, migrateGlasses and migrateIngredients.
 */
describe.each([
  [migrateCategories, Category, CategoriesData, 'category_name', 'strCategory'],
  [migrateGlasses, Glass, GlassesData, 'glass_name', 'strGlass'],
  [migrateIngredients, Ingredient, IngredientsData, 'ingredient_name', 'strIngredient1'],
])('test migration: %p', (migrate, model, rawData, modelField, rawDataField) => {
  beforeAll(() => migrate());

  test('should have same amount of records as raw data(json)', () =>
    model.findAll().then(records => expect(records.length).toEqual(rawData.length)));

  test('should have the same first record as raw data(json)', () =>
    model.findAll().then(records => expect(records[0][modelField]).toEqual(rawData[0][rawDataField])));

  test('should have the same last record as raw data(json)', () => {
    const lastIndex = rawData.length - 1;
    return model
      .findAll()
      .then(records => expect(records[lastIndex][modelField]).toEqual(rawData[lastIndex][rawDataField]));
  });
});

describe('test migration: [Function migrateDrinks]', () => {
  beforeAll(() => migrateDrinks());

  describe('check the associations between Drinks and Ingredients', () => {
    test('should have same amount of records in DrinkIngredients as raw data(json)', () => {
      const count = countDrinkIngredients();
      return DrinkIngredient.findAll({}).then(records => expect(records.length).toEqual(count));
    });
  });

  describe.each([
    ['Glasses', 'strGlass', 'glass_name', 'Glass', Glass],
    ['Categories', 'strCategory', 'category_name', 'Category', Category],
  ])('check the associations between %s and Drinks', (title, rawDataFiled, modelField, modelName, model) => {
    test('should have the same glass as raw data(json) in the first record', () => {
      const fieldValue = DrinksData[0][rawDataFiled];
      const drinkName = DrinksData[0].strDrink;
      return Drink.findOne({ where: { drink_name: drinkName }, include: [model] }).then(drink => {
        expect(drink[modelName][modelField]).toEqual(fieldValue);
      });
    });

    test('should have the same glass as raw data(json) in the last record', () => {
      const lastIndex = DrinksData.length - 1;
      const fieldValue = DrinksData[lastIndex][rawDataFiled];
      const drinkName = DrinksData[lastIndex].strDrink;
      return Drink.findOne({ where: { drink_name: drinkName }, include: [model] }).then(drink => {
        expect(drink[modelName][modelField]).toEqual(fieldValue);
      });
    });
  });
});

test('should insert a drink with ingredients', () =>
  Drink.create({
    drink_name: 'awesome drink',
    instructions: 'Just mix them together.',
  })
    .then(drink => drink.addIngredients([1, 2, 3]))
    .then(drinkIngredients => expect(drinkIngredients[0].length).toBe(3)));

describe('check if return drinks given ingredients query is working', () => {
  test('should return 10 drinks', async () => {
    const output = await getDrinksFromIngredients([22, 39]);
    await expect(output.length).toBe(10);
  });
});
