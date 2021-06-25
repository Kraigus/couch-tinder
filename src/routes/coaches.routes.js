const router = require("express").Router();
const User = require("../db/model/user.model");
const Level = require("../db/model/level.model");
const Specialization = require("../db/model/specialization.model");

router
  .route("/")
  .get(async (req, res) => {
    const coaches = await User.find({ isAdmin: false });
    const specialization = await Specialization.find();
    const level = await Level.find();
    res.render("coaches", { coaches, specialization, level });
  })
  .put(async (req, res) => {
    if (req.body.specialization === "Все специалисты" || req.body.level === "Уровень") {
      const coaches = await User.find();
      const level = await Level.find();
      res.json({ coaches, level });
    } else {
      const coaches = await User.find(req.body);
      const level = await Level.find(req.body.level);
      console.log(req.body.level);
      res.json({ coaches, level });
    }
  });

router.route("/:id").get(async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  console.log(user);
  res.render("profile", { user: user[0] });
});

module.exports = router;
