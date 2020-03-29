const passport = require("passport");
const User = require("../../models/User");

module.exports = {
  configure: () => {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      if (user) done(null, user);
      else done(null, false);
    });
  }
};
