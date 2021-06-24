const router = require("express").Router();
const User = require("../db/model/user.model");
const Post = require("../db/model/post.model");

router.route("/").get(async (req, res) => {
  const user = await User.find({ level:'Мастер'});
  const { firstName, lastName, middleName, specialization, level } = user;
  console.log(user);
  res.render("index", {user});
});

module.exports = router;
