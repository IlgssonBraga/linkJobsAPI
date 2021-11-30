const Sequelize = require("sequelize");
const configDB = require("../config/database");
const Employee = require("../app/models/Employee");
const User = require("../app/models/User");
const Service = require("../app/models/Service");

const models = [Employee, User, Service];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDB);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

module.exports = new Database();
