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
          // find the user with the email
          const user = await User.findOne({ email });

          // if the email doesn't exists -> error
          if (!user) done(null, false);

          // if email exists but password is incorrect -> error
          if (password != user.password) done(null, false);

          // return user
          done(null, user);
        }
      )
    );
  }
};
