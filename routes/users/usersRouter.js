const express = require('express');
const UsersController = require('../../controllers/users/usersController');

function usersRouter(storage, log) {
    const router = express.Router();
    router.get('/all', UsersController.getUsers(storage, log));
    router.post('/add', UsersController.addUser(storage, log));
    return router;
}

module.exports = usersRouter;