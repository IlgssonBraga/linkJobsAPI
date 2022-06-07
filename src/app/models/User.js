const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { idle_in_transaction_session_timeout } = require("pg/lib/defaults");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        phone_number: Sequelize.STRING,
        cpf: Sequelize.STRING,
        rg: Sequelize.STRING,
        birth_date: Sequelize.DATE,
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasOne(models.Profile, {
      sourceKey: "id",
      foreignKey: "owner_id",
      as: "owner",
    });
  }
}

module.exports = User;
