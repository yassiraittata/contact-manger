const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler((req, res, next) => {
  let token;

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("User is Unauthorized");
    } else {
      req.user = decoded.user;
      next();
    }
  });

  if (!token) {
    res.status(401);
    throw new Error("User is Unauthorized");
  }
});

module.exports = validateToken;
