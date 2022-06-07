const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../../config/auth");

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match." });
    }
    const { id, name } = user;
    const rep = {
      user: {
        id,
        name,
        email,
      },
      token: await jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };

    return res.json(rep);
  }
}

module.exports = SessionControler;
