'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      DateOfBirth: {
        type: Sequelize.DATE
      },
      IsRegisteredUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      IsApprovedUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};