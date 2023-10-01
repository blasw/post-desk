// Every controller function should return asyncHandler in order to work
const asyncHandler = require('express-async-handler');

// Importing bcrypt for password hashing and JSON Web Token
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function which signs up user and creates JWT token
exports.signUpUser = function (storage, log){
    const op = "usersController.signUpUser";
    return asyncHandler(async(req,res)=>{
        log.debugMsg(op, "requested to sign up user", `ip: ${req.ip}`);

        try {
            if(await storage.userExists(req.body.username)){
                log.debugMsg(op, "User already exists");
                return res.status(409).json({message: "User already exists"});
            }

            const {username, email, password} = req.body;
            let hashedPassword = await bcrypt.hash(password, 0);

            await storage.addUser(username, email, hashedPassword).then((result)=>{
                log.debugMsg(op, "signUpUser success query");
            });

            const token = jwt.sign({username: username}, "debug", {expiresIn: '24h'});

            res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(200).json({message: "User signed up successfully"});

        } catch (err) {
            log.errorMsg(op, "error signing up user", err);
            return res.status(500).json({message: "Error signing up user"});
        }
    });
}

// Function which logs in user and creates JWT token
exports.loginUser = function (storage, log){
    const op = "usersController.loginUser";
    return asyncHandler(async(req,res)=>{
        log.debugMsg(op, "requested to login user", `ip: ${req.ip}`);
        try{
            const {username, password} = req.body;
            const dbPassword = await storage.getUser(username);
            if (!dbPassword) {
                log.debugMsg(op, "User does not exist");
                return res.status(401).json({message: "User does not exist"});
            }
            const authorized = await bcrypt.compare(password, dbPassword.password);

            if(authorized){
                const token = jwt.sign({username: username}, "debug", {expiresIn: '24h'});

                res.cookie('token', token, {
                    httpOnly: true, 
                    maxAge: 24 * 60 * 60 * 1000
                });

                return res.status(200).json({
                    message: "User logged in successfully",
                    username: username
                });
            } else {
                return res.status(401).json({message: "Authorization failed"});
            }
        } catch (err) {
            log.errorMsg(op, "error logging in user", err);
            return res.status(500).json({message: "Error logging in user"});
        }
    });
}

//Function which will be called after user has been authorized by JWT middleware. It will return user's username
exports.authUser = (storage, log) => {
    const op = "usersController.authUser";
    return asyncHandler(async(req,res)=>{
        log.debugMsg(op, "requested to auth user", `ip: ${req.ip}`);
        try{
            const username = req.username;
            return res.status(200).json({username: username});
        } catch (err) {
            log.errorMsg(op, "error authorizing user", err);
            return res.status(500).json({message: "Error authorizing user"});
        }
    })
}

exports.logoutUser = (storage, log) => {
    const op = "usersController.logoutUser";
    return asyncHandler(async(req,res)=>{
        log.debugMsg(op, "requested to logout user", `ip: ${req.ip}`);
        try{
            res.clearCookie('token');
            return res.status(200).json({message: "User logged out successfully"});
        } catch (err) {
            log.errorMsg(op, "error logging out user", err);
            return res.status(500).json({message: "Error logging out user"});
        }
    });
}