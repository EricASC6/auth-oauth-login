const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true
  }
});

const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
