const router = require('express').Router();
const User = require('../db/model/user.model');

router.route('/').get(async (req, res) => {
  const coaches = await User.find({ isAdmin: false });
  // console.log(coaches);
  res.render('coaches', { coaches });
});

router.route('/:id').get(async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  
  res.render('profile', { user : user[0] });
});

module.exports = router;
