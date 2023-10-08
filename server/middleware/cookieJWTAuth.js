const jwt = require("jsonwebtoken");

//Simple middleware to check if JWT token is valid, in case its valid it will add username to req object and call next middleware, otherwise delete JWT cookie and return 401 status
exports.cookieJWTAuth = (req,res,next) => {
  const token = req.cookies.token;
  try {
    const username = jwt.verify(token, "debug");
    req.username = username;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({message: "Unauthorized"});
  }
}

exports.optionalCookieJWTAuth = (req,res,next) => {
  const token = req.cookies.token;
  try {
    const username = jwt.verify(token, "debug");
    req.username = username;
    next();
  } catch (err) {
    next();
  }
}