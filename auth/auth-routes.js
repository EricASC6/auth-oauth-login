const express = require("express");
const router = express.Router();
const passport = require("passport");
const localAuth = require("./middlewares/local-auth");

router.use(express.urlencoded({ extended: true }));

router.post("/signup", localAuth.signUp());

router.post(
  "/login",
  passport.authenticate("local", {
    session: true
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
