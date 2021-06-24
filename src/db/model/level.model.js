const { model } = require('mongoose');

const Level = model('Level', {
  name: { type: String, required: true, unique: true },
});

module.exports = Level;
