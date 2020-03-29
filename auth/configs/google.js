const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = {
  configure: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/redirect",
          passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
          console.log("access token", accessToken);
          console.log("refresh token", refreshToken);

          const {
            id,
            displayName,
            emails: [{ value: email }],
            photos: [{ value: photo }]
          } = profile;

          console.log("id", id);
          console.log("name", displayName);
          console.log("email", email);
          console.log("photo", photo);

          // look up user in db
          const existingUser = await User.findOne({ email });

          // if user exists, move on to the next phase of auth
          if (existingUser) return done(null, existingUser);

          // else create new user and move on
          const newUser = new User({
            email: email,
            google: {
              name: displayName,
              id,
              photo
            }
          });

          return done(null, await newUser.save());
        }
      )
    );
  }
};
