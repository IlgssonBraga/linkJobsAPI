const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        area: Sequelize.STRING,
        provider_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "provider_id",
      as: "provider",
    });
  }
}

module.exports = Service;
