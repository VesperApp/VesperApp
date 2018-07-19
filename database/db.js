const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vesper');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we have connection to mongodb'));

module.exports = mongoose;