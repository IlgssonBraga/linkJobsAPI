const Sequelize = require("sequelize");
const configDB = require("../config/database");
const Profile = require("../app/models/Profile");
const User = require("../app/models/User");
const Follow = require("../app/models/Follow");

const models = [Profile, User, Follow];

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
