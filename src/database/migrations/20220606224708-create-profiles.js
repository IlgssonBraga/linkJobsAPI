"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("profiles", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false,
      },
      following: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      followers: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      avg_rate: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        default: 0,
      },
      qt_rates: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("profiles");
  },
};
