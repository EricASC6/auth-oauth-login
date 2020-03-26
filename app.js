// Import environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const accountRoutes = require("./routes/account-routes");
const authRoutes = require("./auth/auth-routes");
const local = require("./auth/configs/local");

const app = express();

app.use(
  session({
    secret: "secret",
    name: "id",
    resave: false,
    saveUninitialized: false,
    cookie: {}
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

local.configure(passport);

app.set("view engine", "ejs");

const DB_URL = process.env.DB_URL;
const db = mongoose.connection;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

app.get("/", (req, res) => {
  res.render("dashboard", {
    user: req.user
  });
});
app.use("/account", accountRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
