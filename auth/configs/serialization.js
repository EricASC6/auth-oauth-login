module.exports.config = passport => {
  passport.serializeUser((user, done) => {
    console.log("SERIALIZING USER", user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("DESERIALIZING USER", user);
    done(null, user);
  });
};
