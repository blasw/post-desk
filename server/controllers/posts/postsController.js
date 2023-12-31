//Every controller function should return asyncHandler in order to work
const asyncHandler = require('express-async-handler');

//Function to take every single post from db and return it as json
exports.getPosts = function (storage, log) {
  const op = "postsController.getPosts";
  return asyncHandler(async (req, res, next) => {
    log.debugMsg(op, "requested all posts", `ip: ${req.ip}`);
    let posts;
    try {
      const { sort, page } = req.query;
      const sortBy = sort === "new" ? "id DESC" : "likes_count DESC";
      try {
        const { username } = req.username;
        if (sort === "yours"){
          posts = await storage.getUserPosts(username, page);
          return res.json(posts);
        }
        posts = await storage.getAllPostsAuth(username, sortBy, page);
      } catch (err) {
        posts = await storage.getAllPosts(sortBy, page);
      }
      res.json(posts);
    } catch (err) {
      log.errorMsg(op, "error getting all posts", err);
      res.status(500).send("Error getting all posts");
    }
  });
};

//Function to return the number of pages for pagination
exports.getPages = function (storage, log) {
  const op = "postsController.getPages";
  return asyncHandler(async (req, res) => {
    log.debugMsg(op, "requested pages");
    try{
      const pages = await storage.getPagesCount();
      res.json(pages);
    } catch (err) {
      res.status(500).send("Error getting pages");
    }
  });
}

//Function to add post to db
exports.addPost = function (storage, log) {
  const op = "postsController.addPost";
  return asyncHandler(async (req, res, next) => {
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

exports.addLike = function (storage, log) {
  const op = "postsContoller.addLike";
  return asyncHandler(async (req, res) => {
    log.debugMsg(op, "requested to add like", `ip: ${req.ip}`);
    try {
      const { username, post_id } = req.body;
      const user_id = (await storage.getUser(username)).id;
      await storage.addLike(user_id, post_id);
      log.debugMsg(op, "addLike success", `username: ${username}, post_id: ${post_id}`);
      res.status(200);
    } catch (err) {
      log.errorMsg(op, "error adding like", err);
      res.status(500);
    }
  });
}

exports.undoLike = function (storage, log) {
  const op = "postsController.undoLike";
  return asyncHandler(async (req, res) => {
    log.debugMsg(op, "requested to undo like", `ip: ${req.ip}`);
    try {
      const { username, post_id } = req.body;
      const user_id = (await storage.getUser(username)).id;
      await storage.undoLike(user_id, post_id);
      log.debugMsg(op, "undoLike success", `username: ${username}, post_id: ${post_id}`);
      res.status(200);
    } catch (err) {
      log.errorMsg(op, "error undoing like", err);
      res.status(500);
    }
  });
}