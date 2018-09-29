const db = require('../associate');

describe('Test sequalize models', () => {
  const insertIngredients = () => db.Ingredient.bulkCreate([
    { ingredient_name: 'orange juice' },
    { ingredient_name: 'vodka' },
    { ingredient_name: 'rum' },
  ]);

  beforeAll(() => db.sequelize
    .sync({ force: true })
    .then(insertIngredients));

  afterAll(() => db.sequelize.close());

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
