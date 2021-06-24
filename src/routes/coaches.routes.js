const router = require('express').Router();
const User = require('../db/model/user.model');
const Specialization = require('../db/model/specialization.model');

router.route('/').get(async (req, res) => {
  const coaches = await User.find({ isAdmin: false });
  const specialization = await Specialization.find();
  console.log(specialization);
  res.render('coaches', { coaches , specialization});
});

router.route('/:id').get(async (req, res) => {
  const user = await User.find({ _id: req.params.id });

  res.render('profile', { user: user[0] });
});

module.exports = router;
