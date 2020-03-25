const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

module.exports = {
  config: () => {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email"
        },
        async (email, password, done) => {
          const user = await User.findOne({ email });
          if (!user) done(null, false);

          const isValidPassword = await user.isValidPassword(password);
          if (!isValidPassword) done(null, false);
          else done(null, user);
        }
      )
    );
  }
};
