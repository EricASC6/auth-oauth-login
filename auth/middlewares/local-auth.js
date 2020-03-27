const User = require("../../models/User");

module.exports = {
  signUp() {
    return async (req, res, next) => {
      console.log("Signing Up");

      // get email & password from request
      const { email, password } = req.body;
      console.log("email", email);
      console.log("password", password);

      // check if another user has the same email
      const existingUser = await User.findOne({ email });
      // if yes -> error
      if (existingUser) {
        console.log("existing user", existingUser);
        return res.redirect("/account/signup");
      }

      // else create new user with hashed password
      const passwordHash = await User.hashPassword(password);
      const newUser = new User({ email: email, password: passwordHash });
      await newUser.save();
      return res.redirect("/account/login");
    };
  }
};
