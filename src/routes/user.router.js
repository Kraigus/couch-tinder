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
    const { firstName, lastName, middleName, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    try {
      const newUser = await User.create({ firstName, lastName, middleName, email, password: hash });
      if (newUser) {
        res.redirect("/lk");
      }
    } catch (error) {
      res.redirect("/registration");
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
      res.redirect("/login");
    }
  });

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Good Bye");
  });
  res.redirect("/login");
});

module.exports = router;
