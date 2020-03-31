// Import environment variables
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
const SECRET = process.env.SECRET;

// Import dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const accountRoutes = require("./routes/account-routes");
const authRoutes = require("./auth/auth-routes");
require("./auth/configs/local");
require("./auth/configs/google");
require("./auth/configs/serialization").config();

const db = mongoose.connection;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser(SECRET));
app.use(
  session({
    secret: SECRET,
    name: "id",
    store: new MongoStore({
      mongooseConnection: db
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {}
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    console.log("USER IS NOT AUTHENTICATED");
    res.locals.user = null;
    res.clearCookie("id");
  } else {
    console.log("USER IS AUTHENTICATED");
    res.locals.user = req.user;
  }
  next();
});

const isAuthenticated = async (req, res, next) => {
  console.log("cookie id", req.signedCookies.id);
  if (req.isAuthenticated()) return next();
  return res.redirect("/account/login");
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard");
});
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
