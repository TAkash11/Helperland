"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressModelAttributes = exports.UserAddress = void 0;
const sequelize_1 = require("sequelize");
class UserAddress extends sequelize_1.Model {
}
exports.UserAddress = UserAddress;
;
exports.UserAddressModelAttributes = {
    AddressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    UserId: {
        allowNull: false,
        references: { model: 'User', key: 'UserId' },
        type: sequelize_1.DataTypes.INTEGER
    },
    AddressLine1: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    AddressLine2: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    City: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    State: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    PostalCode: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    IsDefault: {
        // allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsDeleted: {
        // allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    UserTypeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    }
};
