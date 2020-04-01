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
const flash = require("connect-flash");
const accountRoutes = require("./routes/account-routes");
const authRoutes = require("./auth/auth-routes");
require("./auth/configs/local").config(passport);
require("./auth/configs/google");
require("./auth/configs/serialization").config(passport);

const db = mongoose.connection;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

const app = express();
app.set("view engine", "ejs");

const sessionStore = new MongoStore({
  mongooseConnection: db
});
sessionStore.clear();
app.use(cookieParser(SECRET));
app.use(
  session({
    secret: SECRET,
    name: "id",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  next();
});
app.use((req, res, next) => {
  sessionStore.all((_, sessions) => console.log("sessions: ", sessions));
  console.log("SESSION USER", req.session.user);
  if (req.isAuthenticated()) {
    console.log("USER IS AUTHENTICATED");
    res.locals.user = req.user;
  } else {
    console.log("USER IS NOT AUTHENTICATED");
    res.locals.user = null;
  }
  next();
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/account/login");
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

app.use("/account", accountRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
