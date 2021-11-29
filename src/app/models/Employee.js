const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (employee) => {
      if (employee.password) {
        employee.password_hash = await bcrypt.hash(employee.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = Employee;
