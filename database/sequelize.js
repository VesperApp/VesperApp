const Sequelize = require('sequelize');

let env;
if (process.env.CLEARDB_DATABASE_URL) {
  env = 'heroku';
  module.exports = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  if (process.env.NODE_ENV === 'test') {
    env = 'test';
  } else {
    env = 'development';
  }

  const config = require('./config')[env];
  module.exports = new Sequelize(config.database, config.username, config.password, config);
}
