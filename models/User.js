const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  }
});

userSchema.methods.hashPassword = async function() {
  try {
    const password = this.password;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("normal passwd", password);
    console.log("hashed passwd", passwordHash);

    this.password = passwordHash;
  } catch (err) {
    return err;
  }
};

userSchema.methods.isValidPassword = async function() {
  // compare the plain text passwd with the hashed one
};

const User = mongoose.model("user", userSchema);

module.exports = User;
