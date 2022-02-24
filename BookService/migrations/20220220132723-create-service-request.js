'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceRequest', {
      ServiceRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'UserId'
        },
      },
      ServiceId: {
        type: Sequelize.INTEGER
      },
      ServiceStartDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ZipCode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ServiceStartTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      ServiceHourlyRate: {
        type: Sequelize.DECIMAL
      },
      ServiceHours: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      ExtraHours: {
        type: Sequelize.FLOAT
      },
      SubTotal: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      TotalCost: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Comments: {
        type: Sequelize.STRING
      },
      ServiceProviderId: {
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: Sequelize.INTEGER
      },
      HasPets: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      ModifiedBy: {
        type: Sequelize.INTEGER
      },
      ModifiedDate: {
        type: Sequelize.DATE
      },
      ModifiedBy: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ServiceRequest');
  }
};