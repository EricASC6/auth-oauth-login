const passport = require("passport");

module.exports = {
  config() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
      done(null, user);
    });
  }
};
