const express = require("express");
const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

router
  .route("/registration")
  .get((req, res) => {
    res.render("registration");
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    try {
      const newUser = await User.create({ firstName, lastName, email, password: hash });
      if (newUser) {
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
    try {
      const findUser = await User.findOne({ email });
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (findUser && comparePassword) {
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
