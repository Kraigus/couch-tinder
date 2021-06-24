const router = require("express").Router();
const User = require("../db/model/user.model");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router
  .route("/registration")
  .get((req, res) => {
    res.render("registration");
  })
  .post(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
      console.log(newUser);
      if (newUser) {
        // console.log(req.session);
        // console.log("oui");
        req.session.firstName = newUser.firstName;
        req.session.lastName = newUser.lastName;
        console.log(req.session.firstName);
        req.session.userId = newUser._id;
        res.redirect("/lk");
      }
    } catch (error) {
      res.redirect("/users/registration");
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
      // console.log(email);
      const findUser = await User.findOne({ email });
      // console.log(findUser);
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (findUser && comparePassword) {
        req.session.firstName = findUser.firstName;
        req.session.userId = findUser._id;
        res.redirect("/lk");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/users/login");
    }
  });

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Good Bye");
  });
  res.redirect("/users/login");
});


module.exports = router;
