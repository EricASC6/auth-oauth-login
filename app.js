const express = require("express");

const app = express();

// set up ejs
app.set("view enginer", "ejs");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
