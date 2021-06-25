const { model } = require('mongoose');

const Level = model('levels', {
  name: { type: String, required: true, unique: true },
});

module.exports = Level;
