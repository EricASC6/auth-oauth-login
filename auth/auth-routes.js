const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use(express.urlencoded({ extended: true }));

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
