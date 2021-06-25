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
    console.log(".......", req.body);
    console.log(req.body.specialization);
    const filter = { isAdmin: false };

    if (!(req.body.level === "Уровень")) {
      filter.level = req.body.level;
    }

    if (!(req.body.specialization === "Все специалисты")) {
      filter.specialization = req.body.specialization;
    }
    console.log(filter);

    const coaches = await User.find(filter);
    console.log(coaches);
    res.json(coaches);

    // if (req.body.specialization === "Все специалисты") {
    //   const coaches = await User.find({ isAdmin: false });
    //   console.log("ifffff", coaches);
    //   const level = await Level.find();
    //   res.json({ coaches, level });
    // } else {
    //   const coaches = await User.find({ specialization: req.body.specialization }); //.sort({ level: req.body.level })
    //   console.log("else", coaches);
    //   if (coaches) {
    //     const filteredCoaches = coaches.filter((el) => el.level === req.body.level);
    //     console.log(filteredCoaches);
    //     if (filteredCoaches) {
    //       const level = await Level.find({ level: req.body.level });
    //       res.json({ coaches: filteredCoaches, level });
    //     }
    //   }
    //   const level = await Level.find({ level: req.body.level });
    //   res.json({ coaches, level });
    // }
  });

router.route("/:id").get(async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    console.log("aaaaaaaaaaaaa", user);
    res.render("profile", { user: user[0] });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
