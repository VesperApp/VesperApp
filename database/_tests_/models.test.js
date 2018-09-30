const db = require('../associate');
const { truncateTables } = require('./util');

describe('Test sequalize models', () => {
  beforeAll(() => truncateTables());

  test('should be running on test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('should insert a drink with ingredients',
    () => db.Drink.create({
      drink_name: 'awesome drink',
      instructions: 'Just mix them together.',
    })
      .then(drink => drink.addIngredients([1, 2, 3]))
      .then(drinkIngredients => expect(drinkIngredients[0].length).toBe(3)));
});
