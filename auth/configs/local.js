const LocalStrategy = require("passport-local").Strategy;

module.exports = {
  configure: passport => {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passReqToCallback: true
        },
        async (req, email, password, done) => {
          console.log(email, password);
          done(null, { email: "eric@gmail.com" });
        }
      )
    );
  }
};
