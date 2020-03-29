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
const local = require("./auth/configs/local");

const db = mongoose.connection;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

const app = express();

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});
app.use(
  session({
    secret: SECRET,
    name: "id",
    store: sessionStore,
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
  const authenticated = req.isAuthenticated();
  if (authenticated) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
    res.clearCookie("id");
  }

  next();
});

local.configure(passport);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log(req.user);
  if (!req.user) return res.redirect("/account/login");
  res.render("dashboard");
});
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
