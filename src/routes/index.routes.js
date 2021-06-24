const router = require("express").Router();
const User = require("../db/model/user.model")
const Post = require("../db/model/post.model")

router
.route("/")
.get((req, res) => {
  res.render("index");
});

module.exports = router;
