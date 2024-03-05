const jwt = require("jsonwebtoken");

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = { verifyToken };
