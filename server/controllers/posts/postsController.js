const asyncHandler = require('express-async-handler');

exports.getPosts = function (storage, log){
  const op = "postsController.getPosts";
  return asyncHandler( async (req, res, next) => {
    log.debugMsg(op, "requested all posts", `ip: ${req.ip}`);
    try {
      storage.getAllPosts().then((posts) => {
        log.debugMsg(op, "getAllPosts success", posts);
        res.json(posts);
      });
    } catch (err) {
      log.errorMsg(op, "error getting all posts", err);
      res.status(500).send("Error getting all posts");
    }
  });
};

exports.addPost = function (storage, log){
  const op = "postsController.addPost";
  return asyncHandler( async (req, res, next) => {
    log.debugMsg(op, "requested to add post", `ip: ${req.ip}`);
    try {
      await storage.addPost(req.body.title, req.body.content, req.body.author_id);
      log.debugMsg(op, "addPost success", `title: ${req.body.title}`);
      res.status(200).send("Post added successfully");
    } catch (err) {
      log.errorMsg(op, "error adding post", err);
      res.status(500).send("Error adding post");
    }
  });
};

exports.findPostAuthor = function (storage, log){
  const op = "postsController.findPostAuthor";
  return asyncHandler( async (req, res, next) => {
    try {
      storage.findUser(Number(req.body.author_id)).then((author) => {
        res.json({"username" : author.rows[0].username});
      });
    } catch (err) {
      log.errorMsg(op, "error finding post author", err);
      res.status(500).send("Error finding post author");
    }
  });
};