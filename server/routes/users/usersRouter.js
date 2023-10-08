const express = require('express');

//importing controller for the users routes
const UsersController = require('../../controllers/users/usersController');

const {cookieJWTAuth} = require('../../middleware/cookieJWTAuth');

function usersRouter(storage, log) {
    const router = express.Router();
    router.post('/signup', UsersController.signUpUser(storage, log));
    router.post('/login', UsersController.loginUser(storage, log));
    router.get("/auth", cookieJWTAuth, UsersController.authUser(storage, log));
    router.get('/logout', cookieJWTAuth, UsersController.logoutUser(storage, log));
    router.get("/stats", cookieJWTAuth, UsersController.getStats(storage, log));
    
    return router;
}

module.exports = usersRouter;