const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Follow extends Model {
  static init(sequelize) {
    super.init(
      {
        followed_by: Sequelize.INTEGER,
        following: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Profile, {
      foreignKey: "id",
      as: "follow",
    });
  }
}

module.exports = Follow;
