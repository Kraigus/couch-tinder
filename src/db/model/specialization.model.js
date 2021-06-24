const { model } = require('mongoose');

const Specialization = model('specializations', {
  name: { type: String, required: true, unique: true },
});

module.exports = Specialization;
