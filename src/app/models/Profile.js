const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        owner_id: Sequelize.INTEGER,
        following: Sequelize.INTEGER,
        followers: Sequelize.INTEGER,
        avg_rate: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "owner_id",
      as: "owner",
    });
  }
}

module.exports = Profile;
