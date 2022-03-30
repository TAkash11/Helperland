'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequestAddress', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceRequestId: {
        references: {
          model:'ServiceRequest',
          key: 'ServiceRequestId'
        },
        type: Sequelize.INTEGER
      },
      AddressLine1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      AddressLine2: {
        type: Sequelize.STRING
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      PostalCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Mobile: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ServiceRequestAddress');
  }
};