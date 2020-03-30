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
const cookieParser = require("cookie-parser");
const SessionManager = require("./models/Session");
const accountRoutes = require("./routes/account-routes");
const authRoutes = require("./auth/auth-routes");

const db = mongoose.connection;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

const app = express();

const sessionManager = new SessionManager(db).init(session);
sessionManager.sessionStore.clear();

app.use(
  session({
    secret: SECRET,
    name: "id",
    store: sessionManager.sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {}
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  sessionManager.sessionStore.all((_, sess) => console.log(sess));
  // make session manager available everywhere
  req.sessionManager = sessionManager;
  next();
});
app.use((req, res, next) => {
  if (req.isUnauthenticated()) {
    res.locals.user = null;
    res.clearCookie("id");
  } else {
    res.locals.user = req.user;
  }
  next();
});

require("./auth/configs/local");
require("./auth/configs/google");
require("./auth/configs/facebook");
require("./auth/configs/serialization").config();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const session = await req.sessionManager.getSession(req.signedCookies.id);
  console.log("session", session);

  if (req.isAuthenticated()) {
    res.render("dashboard");
  } else {
    res.redirect("/account/login");
  }
});
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
