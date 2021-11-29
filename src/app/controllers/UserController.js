const User = require("../models/User");

class UserController {
  async index(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }

  async show(req, res) {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not find" });
    }
    return res.json(user);
  }

  async store(req, res) {
    const { email } = req.body;
    const verificaEmail = await User.findOne({ where: { email } });
    if (verificaEmail) {
      return res.status(400).json({ error: "E-mail already exists." });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const { email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (email && email !== user.email) {
      const verificaEmail = await User.findOne({ where: { email } });
      if (verificaEmail) {
        return res.status(400).json({ error: "E-mail already exists." });
      }
    }

    await user.update(req.body);

    const userUpdated = await User.findByPk(req.params.id);

    return res.json(userUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not find" });
    }

    user.destroy();
    return res.status(204).json();
  }
}

module.exports = UserController;
