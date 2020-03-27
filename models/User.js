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

userSchema.statics.hashPassword = async function(password) {
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  } catch (err) {
    return err;
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
