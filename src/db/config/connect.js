const mongoose = require('mongoose');
const { options } = require('./config');

function connect() {
  mongoose
    .connect(process.env.mongoUrl, options)
    .then(() => console.log('Connect to DB'));
}

function disconnect() {
  mongoose.disconnect();
}

module.exports = { connect, disconnect };
