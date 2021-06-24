const { model } = require('mongoose');

const Specialization = model('Specialization', {
  name: { type: String, required: true, unique: true },
});

module.exports = Specialization;
