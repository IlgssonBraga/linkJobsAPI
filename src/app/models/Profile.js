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
        qt_rates: Sequelize.INTEGER,
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

  static associate(models) {
    this.hasMany(models.Follow, {
      foreignKey: "followed_by",
      as: "follow",
    });
  }

  static associate(models) {
    this.hasMany(models.Avaliation, {
      foreignKey: "rated_by",
      as: "avaliaton",
    });
  }
}

module.exports = Profile;
