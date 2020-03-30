const sessionStore = require("connect-mongo");

class Session {
  static sessionStore = sessionStore;

  constructor(sessionId) {
    this.sessionId = sessionId;
  }
}
