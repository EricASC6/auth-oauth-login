const express = require("express");
const path = require("path");
const accountRoutes = require("./routes/account-routes");

const app = express();

// set up ejs
app.set("view engine", "ejs");

// static routes
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/account", accountRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
