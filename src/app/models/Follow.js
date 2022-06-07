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

  //   static associate(models) {
  //     this.belongsTo(models.User, {
  //       foreignKey: "owner_id",
  //       as: "owner",
  //     });
  //   }
}

module.exports = Follow;
