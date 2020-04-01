const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

module.exports.config = passport => {
  passport.use(
    "local:signup",
    new LocalStrategy(
      {
        usernameField: "email"
      },
      async (email, password, done) => {
        console.log("Signing Up locally");
        console.log("email", email);
        console.log("password", password);

        try {
          const existingUser = await User.findOne({ email });
          if (existingUser && existingUser.strategy.includes("local")) {
            console.log("existing user");
            return done(null, false, {
              message: "You already have an account, please login"
            });
          } else if (existingUser) {
            existingUser.strategy.push("local");
            existingUser.password = await User.hashPassword(password);
            return done(null, await existingUser.save());
          }

          const passwordHash = await User.hashPassword(password);
          const newUser = new User({
            strategy: ["local"],
            email: email,
            password: passwordHash
          });

          return done(null, await newUser.save());
        } catch (err) {
          return done(null, false, {
            message: "Something went wrong, please try again"
          });
        }
      }
    )
  );

  passport.use(
    "local:login",
    new LocalStrategy(
      {
        usernameField: "email",
        session: true,
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        console.log("logining in locally");
        console.log("email", email);
        console.log("password", password);

        try {
          // Look up user with the email in the db
          const user = await User.findOne({ email });
          // Handle if user does not exists
          if (!user)
            return done(null, false, {
              message: "Account does not exist, please sign up"
            });

          // Authenticate with password
          const isValidPassword = await user.isValidPassword(password);

          if (!isValidPassword)
            return done(null, false, {
              message: "Incorrect password, please try again"
            });

          console.log("SUCCESSFUL LOGIN");

          return done(null, user);
        } catch (err) {
          console.log("ERROR: ", err);
          return done(null, false, {
            message: "Something went wrong, please try again"
          });
        }
      }
    )
  );
};
