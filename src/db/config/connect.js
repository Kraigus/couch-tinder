const mongoose = require('mongoose');
const { dbUrl, options } = require('./config');

function connect() {
  mongoose.connect(dbUrl, options).then(() => console.log("Connect to DB"));
}

module.exports = {connect};
