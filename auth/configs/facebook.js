const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/User");

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

passport.use(
  "facebook:signup",
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/signup/redirect",
      profileFields: ["id", "displayName", "photos", "emails"],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("Signing up with facebook");
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);

      const {
        id,
        displayName,
        photos: [{ value: photo }]
      } = profile;
      // Find if an user account already exists with the email
      //   const existingUser = await User.findOne({email: })

      // handle existing users
      // if the user exists but does not have a facebook account

      // does already have a fb account

      // create new fb account
    }
  )
);

passport.use(
  "facebook:login",
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/login/redirect",
      profileFields: ["id", "displayName", "photos", "email"],
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("Signing up with facebook");
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);

      console.log("profile", profile);
    }

    // look for user with fb id and email

    // handle existing user

    // handle missing user
  )
);
