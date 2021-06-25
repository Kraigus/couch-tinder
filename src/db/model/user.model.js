const { model } = require("mongoose");

const User = model("users", {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: false },
  level: { type: String, required: false },
  score: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  image: { type: Boolean, default: false },
});

module.exports = User;
