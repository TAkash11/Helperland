"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestAddressModelAttributes = exports.ServiceRequestAddress = void 0;
const sequelize_1 = require("sequelize");
class ServiceRequestAddress extends sequelize_1.Model {
}
exports.ServiceRequestAddress = ServiceRequestAddress;
;
exports.ServiceRequestAddressModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    // ServiceRequestId: {
    //   allowNull: false,
    //   references:{ model: 'ServiceRequest', key: 'ServiceRequestId' },
    //   type: DataTypes.INTEGER
    // },
    AddressLine1: {
        type: sequelize_1.DataTypes.STRING
    },
    AddressLine2: {
        type: sequelize_1.DataTypes.STRING
    },
    City: {
        type: sequelize_1.DataTypes.STRING
    },
    State: {
        type: sequelize_1.DataTypes.STRING
    },
    PostalCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
};
