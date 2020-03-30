const passport = require("passport");

class Authenticator {
  constructor(signupStategy, loginStategy) {
    this.signupStategy = signupStategy;
    this.loginStategy = loginStategy;
  }

  login(options) {
    return passport.authenticate(this.loginStategy, options);
  }

  signup(options) {
    return passport.authenticate(this.signupStategy, options);
  }
}

module.exports = Authenticator;
