const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

passport.use(
  "local:login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      console.log("logining in");
      console.log("email", email);
      console.log("password", password);

      // Look up user with the email in the db
      const user = await User.findOne({ email });
      // Handle if user does not exists
      if (!user) return done(null, false);

      // Authenticate with password
      const isValidPassword = await user.isValidPassword(password);

      if (!isValidPassword) return done(null, false);

      return done(null, user);
    }
  )
);
