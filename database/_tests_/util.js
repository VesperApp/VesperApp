const { sequelize } = require('../associate');

/**
 * Clear out  test database before all tests.
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

module.exports = { truncateTables, endConnection };
