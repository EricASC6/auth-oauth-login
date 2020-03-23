// Import environment variables
const dotenv = require("dotenv");
dotenv.config();

// Import dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/account-routes");

const app = express();

// set up ejs
app.set("view engine", "ejs");

// Connect to mongodb
const DB_URL = process.env.DB_URL;
const db = mongoose.connection;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
db.once("open", () => console.log(`connected to ${DB_URL}`));
db.on("error", err => console.log(`connection error: ${err}`));

// static routes
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/account", accountRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
