const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../../config/auth");

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Token not found." });
  }
  const [, token] = authToken.split(" ");
  try {
    const encoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = encoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid." });
  }
};
