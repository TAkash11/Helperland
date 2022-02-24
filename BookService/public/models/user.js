"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Password: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     UserTypeId: DataTypes.NUMBER,
//     DateOfBirth: DataTypes.DATE,
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     IsApproved: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
;
exports.UserModelAttributes = {
    UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    FirstName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    LastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    UserTypeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    DateOfBirth: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE
    },
    IsRegisteredUser: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsApprovedUser: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING
    }
};
