const User = require("../../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async signUp(req, res, next) {
    // get email & password from request body
    const { email, password } = req.body;

    // check if email already exists in the database
    const existingUser = await User.findOne({ email });

    // if email exists, then redirect user back to sign up with an error
    if (existingUser)
      return res.json("existing user, please login into your account");
    else {
      // create new user and store in the database
      const newUser = new User({ email, password });
      await newUser.hashPassword();
      req.user = await newUser.save();
      next();
    }
  },

  createToken() {
    return (req, res, next) => {
      const JWT_SECRET = process.env.JWT_SECRET;
      const { _id, email } = req.user;
      const payload = JSON.stringify({ sub: _id, email });
      const token = jwt.sign(payload, JWT_SECRET);
      req.token = token;
      next();
    };
  }
};
