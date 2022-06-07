const Avaliation = require("../models/Avaliation");
const Profile = require("../models/Profile");

class AvaliationController {
  async show(req, res) {
    const id = req.params.id;
    const avaList = await Avaliation.findAll({
      where: { rated: id },
    });
    if (!avaList) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(avaList);
  }

  async store(req, res) {
    const id = req.params.id; // id do profile
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    const followedByProfile = await Profile.findOne({
      where: { owner_id: req.userId },
    });
    if (!followedByProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (followedByProfile.id == id) {
      return res.status(400).json({ message: "Bad request" });
    }

    const findAva = await Avaliation.findOne({
      where: { rated_by: followedByProfile.id, rated: id },
    });
    if (findAva) {
      return res
        .status(404)
        .json({ message: "You already avaliate this profile" });
    }
    await Avaliation.create({
      rated_by: followedByProfile.id,
      rated: id,
      rate: req.body.rate,
    });

    await profile.update({
      qt_rates: profile.qt_rates + 1,
      avg_rate:
        (profile.avg_rate * profile.qt_rates + req.body.rate) /
        (profile.qt_rates + 1),
    });

    const profileNew = await Profile.findByPk(id);
    return res.json(profileNew);
  }

  async delete(req, res) {
    const id = req.params.id; // id do profile
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const followedByProfile = await Profile.findOne({
      where: { owner_id: req.userId },
    });

    if (!followedByProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const findAva = await Avaliation.findOne({
      where: { rated_by: followedByProfile.id, rated: id },
    });
    if (!findAva) {
      return res
        .status(404)
        .json({ message: "You don't avaliate this profile" });
    }

    findAva.destroy();

    await profile.update({
      qt_rates: profile.qt_rates - 1,
      avg_rate:
        (profile.avg_rate * profile.qt_rates - findAva.rate) /
        (profile.qt_rates - 1 == 0 ? 1 : profile.qt_rates - 1),
    });

    return res.status(204).json();
  }

  async update(req, res) {
    const id = req.params.id; // id do profile
    let profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const followedByProfile = await Profile.findOne({
      where: { owner_id: req.userId },
    });

    if (!followedByProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const findAva = await Avaliation.findOne({
      where: { rated_by: followedByProfile.id, rated: id },
    });
    if (!findAva) {
      return res
        .status(404)
        .json({ message: "You don't avaliate this profile" });
    }

    await profile.update({
      qt_rates: profile.qt_rates - 1,
      avg_rate:
        (profile.avg_rate * profile.qt_rates - findAva.rate) /
        (profile.qt_rates - 1 == 0 ? 1 : profile.qt_rates - 1),
    });

    await findAva.update({
      rate: req.body.rate,
    });

    profile = await Profile.findByPk(id);

    await profile.update({
      qt_rates: profile.qt_rates + 1,
      avg_rate:
        (profile.avg_rate * profile.qt_rates + req.body.rate) /
        (profile.qt_rates + 1),
    });

    profile = await Profile.findByPk(id);

    return res.json(profile);
  }
}

module.exports = AvaliationController;
