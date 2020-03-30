class SessionManager {
  static NUM_SESSION_MANAGERS = 0;
  static MAX_SESSION_MANAGERS = 1;

  constructor(sessionConnection) {
    if (
      SessionManager.NUM_SESSION_MANAGERS < SessionManager.MAX_SESSION_MANAGERS
    ) {
      SessionManager.NUM_SESSION_MANAGERS++;
      this.sessionConnection = sessionConnection;
      this.sessionStore = null;
    } else throw new Error("Maximum amount of session managers exceeded");
  }

  init(session) {
    const MongoStore = require("connect-mongo")(session);
    const sessionStore = new MongoStore({
      mongooseConnection: this.sessionConnection
    });
    this.sessionStore = sessionStore;
    return this;
  }

  async getSessionStore() {
    return this.sessionStore;
  }

  async getSession(id) {
    return await new Promise((resolve, reject) => {
      this.sessionStore.get(id, (err, session) => {
        if (err) reject(err);
        else resolve(session);
      });
    });
  }

  insertDataInSession(id, data) {}
}

module.exports = SessionManager;
