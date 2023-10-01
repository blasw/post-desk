const express = require('express');

//importing controller for the posts routes
const PostsController = require('../../controllers/posts/postsController');
//JWT middleware import
const {cookieJWTAuth} = require('../../middleware/cookieJWTAuth');

function postsRouter(storage, log) {
  const router = express.Router(); 
  router.get('/all', PostsController.getPosts(storage, log));
  router.post('/add', cookieJWTAuth, PostsController.addPost(storage, log));
  return router;
}

module.exports = postsRouter;