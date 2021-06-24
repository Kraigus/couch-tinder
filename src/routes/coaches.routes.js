const router = require('express').Router();
const User = require('../db/model/user.model');
const Specialization = require('../db/model/specialization.model');

router
  .route('/')
  .get(async (req, res) => {
    const coaches = await User.find({ isAdmin: false });
    const specialization = await Specialization.find();
    res.render('coaches', { coaches, specialization });
  })
  .put(async (req, res) => {
    console.log(req.body);
    if (req.body.specialization === 'Все специалисты') {
      const coaches = await User.find();
      res.json({ coaches });
    } else {
      const coaches = await User.find(req.body);
      res.json({ coaches });
    }
  });

router.route('/:id').get(async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  console.log(user)
  res.render('profile', { user: user[0] });
});

module.exports = router;
