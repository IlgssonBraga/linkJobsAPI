const Profile = require("../models/Profile");
// const User = require("../models/User");

class ProfileController {
  async index(req, res) {
    const profiles = await Profile.findAll();

    return res.json(profiles);
  }

  async show(req, res) {
    const id = req.params.id;
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.json(profile);
  }

  async store(req, res) {
    const profile = await Profile.findOne({
      where: { owner_id: req.userId },
    });
    if (profile) {
      return res.status(404).json({ message: "Profile already exists." });
    }
    await Profile.create({
      owner_id: req.userId,
      following: 0,
      followers: 0,
    });
    const newProfile = await Profile.findOne({
      where: { owner_id: req.userId },
    });
    return res.json(newProfile);
  }

  async delete(req, res) {
    const id = req.params.id;
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.destroy();
    return res.status(204).json();
  }
}

module.exports = ProfileController;
