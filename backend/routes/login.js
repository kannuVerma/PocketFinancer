const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const bcrypt = require("bcrypt");


router.get("/", async (req, res) => {
  // if logged in, redirect to user's profile
  if (req.session && req.session.user) {

    res.status(406).send({ error: "Already logged in" });
  } else {
    res.render("users/login", {
      title: "Login Page",
      logged_in: req.session && req.session.user ? true : false,
    });
  }
});

router.post("/", async (req, res) => {
  const userPostData = req.body;
  try {
    const email = userPostData.email;
    const password = userPostData.password;
    if (email && password) {
      const newUser = await userData.getUserByEmail(userPostData.email);
      if (newUser == null) {
        res.status(401).send({ error: "Email or password is wrong" });
        return;
      }
      const passwordMatch = await bcrypt.compare(
        userPostData.password,
        newUser.password
      );
      if (passwordMatch) {
        // req.session.user = newUser;

        const hour = 3600000;
        req.session.cookie.maxAge = hour;
        req.session.user = newUser;
        res.json(newUser);
      } 
      else {
        // res.status({
        //   title: "Login Page",
        //   logged_in: req.session && req.session.user ? true : false,
        //   errors: "Email or password is wrong",
        // });
        // return;
        res.status(401).send({ error: "Email or password is wrong" });
        return
      }
    } else {
      res.status(400).send({ error: "Bad Request" });
    }
  } catch (e) {
    res.status(500).send({ error: e });
    console.log(e);
  }
});

module.exports = router;
