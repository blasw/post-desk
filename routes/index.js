//importing routers from different fragments of the app
const postsRouter = require("./posts/postsRouter");
const usersRouter = require("./users/usersRouter");

//and using these routers here to nest the app
module.exports = function(app, storage, log) {
  app.use("/posts", postsRouter(storage, log));
  app.use("/users", usersRouter(storage, log));
};