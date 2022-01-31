'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ContactUs", {
      ContactUsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Phonenumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UploadFileName: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.BIGINT
      },
      IsDeleted: {
        allowNull: false,
        type: Sequelize.BLOB
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
    await queryInterface.dropTable("ContactUs");
  }
};