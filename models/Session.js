const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const SessionManager = {
  sessionStore: new MongoStore(session),

  async deleteSession(id) {}
};

module.exports = SessionManager;
