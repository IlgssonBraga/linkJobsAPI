"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_neighborhood: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address_complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
    return queryInterface.dropTable("users");
  },
};
