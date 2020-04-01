const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  "google:signup",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/signup/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("signing up with google");
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);

      const {
        id,
        displayName,
        emails: [{ value: email }],
        photos: [{ value: photo }]
      } = profile;

      try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser && existingUser.strategy.includes("google")) {
          return done(null, false, {
            messsage: "You already have an account, please login"
          });
        } else if (existingUser) {
          existingUser.strategy.push("google");
          existingUser.google = {
            name: displayName,
            id: id,
            photo: photo
          };

          return done(null, await existingUser.save());
        }

        const newUser = new User({
          strategy: ["google"],
          email: email,
          google: {
            name: displayName,
            id: id,
            photo: photo
          }
        });

        return done(null, await newUser.save());
      } catch (err) {
        console.log("ERROR: ", err);
        done(null, false, {
          message: "Something went wrong, please try again"
        });
      }
    }
  )
);

passport.use(
  "google:login",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/login/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("loginning in with google");
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);

      const {
        id,
        emails: [{ value: email }]
      } = profile;

      console.log("id", id);
      console.log("email", email);

      try {
        // look up user in db
        const existingUser = await User.findOne({ email, "google.id": id });

        // if user exists, move on to the next phase of auth
        if (existingUser) return done(null, existingUser);

        // else error
        return done(null, false, {
          message: "Account does not exist, please sign up"
        });
      } catch (err) {
        console.log("ERROR: ", err);
        done(null, false, {
          message: "Something went wrong, please try again"
        });
      }
    }
  )
);
