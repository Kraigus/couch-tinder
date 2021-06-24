const router = require("express").Router();
const User = require("../db/model/user.model");

router.get("/", async (req, res) => {
  const { userId } = req.session;
  console.log(userId);
  const { firstName, lastName, middleName, specialization, level } =
    await User.findById(userId);
  res.render("lk", {
    firstName,
    lastName,
    middleName,
    specialization,
    level,
    userId,
  });
  console.log("==========>");
});

router.put("/:id", async (req, res) => {
  console.log("PUTTTTT");
  const user = await User.findById(req.params.id);
  console.log(user);
  try {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.middleName = req.body.middleName;
    user.specialization = req.body.specialization;
    user.level = req.body.level;
    await user.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
