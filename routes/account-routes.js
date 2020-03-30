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

module.exports = router;
