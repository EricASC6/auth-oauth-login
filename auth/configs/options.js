// Local Strategy
const localSignupStategyOptions = {
  failureRedirect: "/account/signup",
  successRedirect: "/",
  failureFlash: true
};

const localLoginStrategyOptions = {
  failureRedirect: "/account/login",
  successRedirect: "/",
  failureFlash: true
};

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

module.exports = {
  localLoginStrategyOptions,
  localSignupStategyOptions,
  googleLoginStrategyOptions,
  googleSignupStrategyOptions
};
