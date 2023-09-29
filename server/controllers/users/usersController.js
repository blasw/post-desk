const asyncHandler = require('express-async-handler');

exports.getUsers = function (storage, log){
    const op = "usersController.getUsers";
    return asyncHandler(async (req,res,next)=> {
        log.debugMsg(op, "requested all users", `ip: ${req.connection.remoteAddress}`);
        try {
            storage.getAllUsers().then((users) => {
                log.debugMsg(op, "getAllUsers success", users);
                res.json(users);
            });
        } catch (err) {
            log.errorMsg(op, "error getting all users", err);
            res.status(500).send("Error getting all users");
        }
    });
}
    
exports.addUser = function (storage, log){
    const op = "usersController.addUser";
    return asyncHandler(async (req, res, next) => {
        log.debugMsg(op, "requested to add user", `ip: ${req.ip}`);
        try {
            await storage.addUser(req.body.username, req.body.email, req.body.password);
            log.debugMsg(op, "addUser success", `username: ${req.body.username}`);
            res.status(200).send("User added successfully");
        } catch (err) {
            log.errorMsg(op, "error adding user", err);
            res.status(500).send("Error adding user");
        }
    })
}