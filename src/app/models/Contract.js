const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.DOUBLE,
        provider_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
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
    this.belongsTo(models.User, {
      foreignKey: "customer_id",
      as: "customer",
    });
  }
}

module.exports = Contract;
