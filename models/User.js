const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  strategy: {
    type: Array,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  google: {
    name: {
      type: String
    },
    id: {
      type: String,
      unique: true
    },
    photo: {
      type: String
    }
  },
  facebook: {
    name: {
      type: String
    },
    id: {
      type: String,
      unique: true
    },
    photo: {
      type: String
    }
  },
  sessionId: {
    type: String
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

userSchema.methods.isValidPassword = async function(password) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  } catch (err) {
    return err;
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
