const passport = require("passport");
const {
  localLoginStrategyOptions,
  localSignupStategyOptions,
  googleLoginStrategyOptions,
  googleSignupStrategyOptions
} = require("../configs/options");

class Auth {
  static localLogin = () => {
    return passport.authenticate("local:login", localLoginStrategyOptions);
  };

  static localSignup = () => {
    return passport.authenticate("local:signup", localSignupStategyOptions);
  };

  static googleLogin = () => {
    return passport.authenticate("google:login", googleLoginStrategyOptions);
  };
  static googleSignup = () => {
    return passport.authenticate("google:signup", googleSignupStrategyOptions);
  };
}

module.exports = Auth;
