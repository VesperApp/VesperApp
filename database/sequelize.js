const Sequelize = require('sequelize');

let env;
if (process.env.CLEARDB_DATABASE_URL) {
  env = 'heroku';
} else if (process.env.NODE_ENV === 'test') {
  env = 'test';
} else {
  env = 'development';
}
// const env = process.env.CLEARDB_DATABASE_URL ? 'heroku' : process.env.NODE_ENV === 'test' ? 'test' : 'development';

const config = require('./config')[env];

module.exports = new Sequelize(config.database, config.username, config.password, config);
