const express = require("express");
const router = express.Router();
const Authenticator = require("./authHandler");

router.use(express.urlencoded({ extended: true }));

// Local Strategy
const localSignupStategyOptions = {
  successRedirect: "/",
  failureRedirect: "/account/signup"
};

const localLoginStrategyOptions = {
  successRedirect: "/",
  failureRedirect: "/account/login"
};

const localAuthenticator = new Authenticator("local:signup", "local:login");
const localSignup = localAuthenticator.signup(localSignupStategyOptions);
const localLogin = localAuthenticator.login(localLoginStrategyOptions);

router.post("/signup", localSignup);
router.post("/login", localLogin);

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

const googleAuthenticator = new Authenticator("google:signup", "google:login");
const googleSignup = googleAuthenticator.signup(googleSignupStrategyOptions);
const googleLogin = googleAuthenticator.login(googleLoginStrategyOptions);

router.get("/google/signup", googleSignup);
router.get("/google/signup/redirect", googleSignup);
router.get("/google/login", googleLogin);
router.get("/google/login/redirect", googleLogin);

// Facebook Strategy
const facebookStrategySignupOptions = {
  scope: ["emails"],
  ...localSignupStategyOptions
};

const facebookAuthenticator = new Authenticator(
  "facebook:signup",
  "facebook:login"
);

const facebookSignup = facebookAuthenticator.signup(
  facebookStrategySignupOptions
);

router.get("/facebook/signup", facebookSignup);
router.get("/facebook/signup/redirect", facebookSignup);

const logout = localAuthenticator.logout();
router.get("/logout", logout);

module.exports = router;
