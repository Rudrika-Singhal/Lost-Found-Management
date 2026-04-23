const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  // check if header exists
  if (!header) {
    return res.status(401).json("No token");
  }

  // 🔥 IMPORTANT FIX
  const token = header.split(" ")[1]; // "Bearer token" -> token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};