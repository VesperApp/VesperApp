module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'vesper',
    host: '127.0.0.1',
    dialect: 'mysql',
    insecureAuth: true,
  },
  test: {
    username: 'root',
    password: '',
    database: 'vesper_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    insecureAuth: true,
  },
  heroku: {
    host: process.env.CLEARDB_DATABASE_URL,
  },
};
