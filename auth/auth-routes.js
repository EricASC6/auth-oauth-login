const express = require("express");
const router = express.Router();
const passport = require("passport");
const localAuth = require("./middlewares/local-auth");

router.use(express.urlencoded({ extended: true }));

// testing route only
router.get("/auth/error", (req, res) => {
  res.status(403).json("Failed to login");
});

router.post(
  "/signup",
  localAuth.signUp,
  localAuth.createToken(),
  (req, res) => {
    res.redirect("/");
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/auth/error"
  }),
  localAuth.createToken(),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
