const passport = require("passport");

class AuthHandler {
  constructor(
    localStrategySignup,
    localStrategyLogin,
    googleStrategySignup,
    googleStrategyLogin,
    successRedirect = "/",
    failureRedirect = "/account/login"
  ) {
    this.localStrategySignup = localStrategySignup;
    this.localStrategyLogin = localStrategyLogin;
    this.googleStrategySignup = googleStrategySignup;
    this.googleStrategyLogin = googleStrategyLogin;
    this.successRedirect = successRedirect;
    this.failureRedirect = failureRedirect;
    this.authOptions = {
      successRedirect: this.successRedirect,
      failureRedirect: this.failureRedirect
    };
  }

  localSignup() {
    return passport.authenticate(this.localStrategySignup, this.authOptions);
  }

  localLogin() {
    return passport.authenticate(this.localStrategyLogin, this.authOptions);
  }
}
