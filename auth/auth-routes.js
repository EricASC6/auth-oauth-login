const express = require("express");
const router = express.Router();
const Auth = require("./controllers/authController");

router.use(express.urlencoded({ extended: true }));

router.post("/signup", Auth.localSignup());
router.post("/login", Auth.localLogin());

router.get("/google/signup", Auth.googleSignup());
router.get("/google/signup/redirect", Auth.googleSignup());
router.get("/google/login", Auth.googleLogin());
router.get("/google/login/redirect", Auth.googleLogin());

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    req.logOut();
    res.redirect("/account/login");
  });
});

module.exports = router;
