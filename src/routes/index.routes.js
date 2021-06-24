const router = require("express").Router();
const User = require("../db/model/user.model");
const Post = require("../db/model/post.model");

router.route("/").get(async (req, res) => {
  const coaches = await User.find({ isAdmin: false });
  res.render("index");
});

module.exports = router;
