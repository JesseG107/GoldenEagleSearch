const jwt = require("jsonwebtoken");
const config = require("../../config.json");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized: No token." });
  }
  try {
    const token = authorization.split(" ").pop();
    const verified = jwt.verify(token, config.jwtsecret);
    req.user = verified; // Token payload includes id, email, and role
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

const isProfessor = (req, res, next) => {
  if (req.user && req.user.role === "Professor") {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Professors only." });
  }
};

module.exports = {
  verifyToken,
  isProfessor,
};
