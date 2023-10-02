//Every controller function should return asyncHandler in order to work
const asyncHandler = require('express-async-handler');

//Function to take every single post from db and return it as json
exports.getPosts = function (storage, log){
  const op = "postsController.getPosts";
  return asyncHandler( async (req, res, next) => {
    log.debugMsg(op, "requested all posts", `ip: ${req.ip}`);
    try {
      storage.getAllPosts().then((posts) => {
        log.debugMsg(op, "getAllPosts success");
        res.json(posts);
      });
    } catch (err) {
      log.errorMsg(op, "error getting all posts", err);
      res.status(500).send("Error getting all posts");
    }
  });
};

//Function to add post to db
exports.addPost = function (storage, log){
  const op = "postsController.addPost";
  return asyncHandler( async (req, res, next) => {
    log.debugMsg(op, "requested to add post", `ip: ${req.ip}`);
    try {
      await storage.addPost(req.body.title, req.body.content, req.body.username);
      log.debugMsg(op, "addPost success", `title: ${req.body.title}`);
      res.status(200).send("Post added successfully");
    } catch (err) {
      log.errorMsg(op, "error adding post", err);
      res.status(500).send("Error adding post");
    }
  });
};