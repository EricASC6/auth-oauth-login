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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/account/login",
    successRedirect: "/"
  })
);

module.exports = router;
