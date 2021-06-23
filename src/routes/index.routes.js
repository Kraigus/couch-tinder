const router = require("express").Router();
const User = require("../db/model/user.model")
const Post = require("../db/model/post.model")

router
.route("/")
.get((req, res) => {
  res.render("index");
})
.post(async (req, res) => {
  const allUser = await User.find();
});

module.exports = router;
