const express = require("express");
const router = express.Router();
const passport = require("passport");
const localAuth = require("./middlewares/local-auth");

router.use(express.json());

// testing route only
router.get("/auth/error", (req, res) => {
  res.status(403).json("Failed to login");
});

router.post("/signup", localAuth.signUp, (req, res) => {
  res.json("testing...");
});

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/auth/error"
  }),
  localAuth.createToken(),
  (req, res) => {
    console.log("token: ", req.token);
    res.json({ token: req.token });
  }
);

module.exports = router;
