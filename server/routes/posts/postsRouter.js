const express = require('express');

//importing controller for the posts routes
const PostsController = require('../../controllers/posts/postsController');
//JWT middleware import
const {cookieJWTAuth, optionalCookieJWTAuth} = require('../../middleware/cookieJWTAuth');

function postsRouter(storage, log) {
  const router = express.Router(); 
  router.get('/all', optionalCookieJWTAuth, PostsController.getPosts(storage, log));
  router.get('/pages', PostsController.getPages(storage, log));
  router.post('/add', cookieJWTAuth, PostsController.addPost(storage, log));
  router.post('/like', cookieJWTAuth, PostsController.addLike(storage, log));
  router.post('/unlike', cookieJWTAuth, PostsController.undoLike(storage, log));
  return router;
}

module.exports = postsRouter;