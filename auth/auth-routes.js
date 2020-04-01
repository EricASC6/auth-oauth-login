const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use(express.urlencoded({ extended: true }));

// Local Strategy
const localSignupStategyOptions = {
  failureRedirect: "/account/signup"
};

const localLoginStrategyOptions = {
  failureRedirect: "/account/login"
};

router.post("/signup");
router.post(
  "/login",
  passport.authenticate("local:login", localLoginStrategyOptions),
  (req, res) => {
    console.log("USER", req.user);
    res.redirect("/");
  }
);

// Google Strategy
const googleSignupStrategyOptions = {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  accessType: "offline",
  approvalPrompt: "force",
  ...localSignupStategyOptions
};

const googleLoginStrategyOptions = {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  accessType: "offline",
  approvalPrompt: "force",
  ...localLoginStrategyOptions
};

// router.get("/google/signup", googleSignup);
// router.get("/google/signup/redirect", googleSignup);
// router.get("/google/login", googleLogin);
// router.get("/google/login/redirect", googleLogin);

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    req.logOut();
    res.redirect("/account/login");
  });
});

module.exports = router;
