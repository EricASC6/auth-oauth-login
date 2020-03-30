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

  logout() {
    return async (req, res) => {
      console.log("loging out asdfasdfasdfasdfadfasdfasdfd");
      req.session.destroy(err => {
        req.logOut();
        return res.redirect("/account/login");
      });
    };
  }
}

module.exports = Authenticator;
