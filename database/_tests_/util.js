const { sequelize } = require('../associate');
const DrinksData = require('../data/drinks');

/**
 * Clear out test database before all tests.
 */
const truncateTables = () =>
  sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(() => sequelize.sync({ force: true }))
    .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'));

/**
 * Close the connection after tests done, otherwise jest would hang.
 */
const endConnection = () => sequelize.close();

/**
 * Count all the ingredients in raw drinks data(json).
 */
const countDrinkIngredients = () => {
  let count = 0;
  DrinksData.forEach(drink => {
    for (let i = 1; i <= 15; i += 1) {
      const strIngredient = drink[`strIngredient${i}`].trim();
      if (strIngredient !== '') {
        count += 1;
      }
    }
  });
  return count;
};

module.exports = { truncateTables, endConnection, countDrinkIngredients };
