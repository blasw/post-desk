const express = require('express');
const PostsController = require('../../controllers/posts/postsController');

function postsRouter(storage, log) {
  const router = express.Router(); 
  router.get('/all', PostsController.getPosts(storage, log));
  router.post('/add', PostsController.addPost(storage, log));
  router.get('/find', PostsController.findPostAuthor(storage, log));
  return router;
}

module.exports = postsRouter;