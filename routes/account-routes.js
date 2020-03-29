const express = require("express");
const router = express.Router();

router.use(["/login", "signup"], (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  console.log("loging out asdfasdfasdfasdfadfasdfasdfd");
  req.logOut();
  res.redirect("/account/login");
});

module.exports = router;
