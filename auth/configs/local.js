const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

passport.use(
  "local:signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      session: true
    },
    async (req, email, password, done) => {
      console.log("Signing Up locally");
      console.log("email", email);
      console.log("password", password);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("existing user");
        return done(null, false);
      }

      const passwordHash = await User.hashPassword(password);
      const newUser = new User({
        strategy: ["local"],
        email: email,
        password: passwordHash
      });

      return done(null, await newUser.save());
    }
  )
);

passport.use(
  "local:login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      session: true
    },
    async (req, email, password, done) => {
      console.log("logining in locally");
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
