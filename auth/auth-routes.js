const express = require("express");
const router = express.Router();
const passport = require("passport");
const localAuth = require("./middlewares/local-auth");

const localAuthenticate = passport.authenticate("local", {
  session: true,
  failureRedirect: "/account/login",
  successRedirect: "/"
});

router.use(express.urlencoded({ extended: true }));

router.post("/signup", localAuth.signUp());

router.post("/login", localAuthenticate);

module.exports = router;
