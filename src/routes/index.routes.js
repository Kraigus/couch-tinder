const router = require("express").Router();
const User = require("../db/model/user.model");

router.route("/").get(async (req, res) => {
  const user = await User.find({ level: "Мастер" });
 
  res.render("index", { user });
});


module.exports = router;
