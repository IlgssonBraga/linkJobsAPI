const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Avaliation extends Model {
  static init(sequelize) {
    super.init(
      {
        rated_by: Sequelize.INTEGER,
        rated: Sequelize.INTEGER,
        rate: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Profile, {
      foreignKey: "id",
      as: "avaliation",
    });
  }
}

module.exports = Avaliation;
