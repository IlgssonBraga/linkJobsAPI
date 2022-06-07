const Follow = require("../models/Follow");
const Profile = require("../models/Profile");
// const User = require("../models/User");

class FollowController {
  async show(req, res) {
    const id = req.params.id;
    const followList = await Follow.findOne({
      where: { following: id },
    });
    if (!followList) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(followList);
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

    const findFollow = await Follow.findOne({
      where: { followed_by: followedByProfile.id, following: id },
    });
    if (findFollow) {
      return res
        .status(404)
        .json({ message: "You already follow this profile" });
    }
    await Follow.create({
      followed_by: followedByProfile.id,
      following: id,
    });

    await followedByProfile.update({
      following: followedByProfile.following + 1,
    });

    await profile.update({
      followers: profile.followers + 1,
    });
    const followedByProfilenew = await Profile.findOne({
      where: { owner_id: req.userId },
    });
    return res.json(followedByProfilenew);
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
      return res.status(404).json({ message: "You don't follow this profile" });
    }

    const findFollow = await Follow.findOne({
      where: { followed_by: followedByProfile.id, following: id },
    });

    if (!findFollow) {
      return res.status(404).json({ message: "You don't follow this profile" });
    }

    console.log("findFollow", findFollow);

    findFollow.destroy();

    await followedByProfile.update({
      following: followedByProfile.following - 1,
    });

    await profile.update({
      followers: profile.followers - 1,
    });
    return res.status(204).json();
  }
}

module.exports = FollowController;
