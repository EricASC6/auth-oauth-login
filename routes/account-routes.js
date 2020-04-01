const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  console.log(req.flash("error"));
  res.render("signup");
});

module.exports = router;
