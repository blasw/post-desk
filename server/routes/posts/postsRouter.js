const express = require('express');

function postsRouter(storage, log) {
  const router = express.Router(); 
  router.get('/', (req, res) => {
    res.send('postsRouter');
  });
  return router;
}

module.exports = postsRouter;