const postsRouter = require("./posts/postsRouter");
const usersRouter = require("./users/usersRouter");

module.exports = function(app, storage, log) {
  app.use("/posts", postsRouter(storage, log));
  app.use("/users", usersRouter(storage, log));
};