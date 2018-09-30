const { sequelize } = require('../associate');

/**
 * Clear out  test database before and after all tests.
 */
const truncateTables = () => sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => sequelize.sync({ force: true }))
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'));

module.exports = { truncateTables };
