const User = require("../models/User");

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      attributes: {
        exclude: ["password_hash"],
      },
    });

    return res.json(user);
  }

  async show(req, res) {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  }

  async store(req, res) {
    const { email, cpf } = req.body;
    const verificaEmail = await User.findOne({ where: { email } });
    if (verificaEmail) {
      return res.status(400).json({ error: "E-mail already exists." });
    }

    if (cpf) {
      const verificaCpf = await User.findOne({ where: { cpf } });
      if (verificaCpf) {
        return res.status(400).json({ error: "Cpf already exists." });
      }
    }

    await User.create(req.body);

    const newUser = await User.findOne({ where: { email }, attributes: {
      exclude: ["password_hash"],
    }});
    return res.json(newUser);
  }

  async update(req, res) {
    const { email, cpf } = req.body;
    const user = await User.findByPk(req.params.id);

    if (email && email !== user.email) {
      const verificaEmail = await User.findOne({ where: { email } });
      if (verificaEmail) {
        return res.status(400).json({ error: "E-mail already exists." });
      }
    }

    if (cpf && cpf !== user.cpf) {
      const verificaCpf = await User.findOne({ where: { cpf } });
      if (verificaCpf) {
        return res.status(400).json({ error: "Cpf already exists." });
      }
    }

    await user.update(req.body);

    const userUpdated = await User.findOne({ where: { id: req.params.id }, attributes: {
      exclude: ["password_hash"],
    }});

    return res.json(userUpdated);
  }

  async delete(req, res) {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.destroy();
    return res.status(204).json();
  }
}

module.exports = UserController;
