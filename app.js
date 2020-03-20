const express = require("express");
const accountRoutes = require("./routes/account-routes");

const app = express();

// set up ejs
app.set("view enginer", "ejs");

// routes
app.use("/acount", accountRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
