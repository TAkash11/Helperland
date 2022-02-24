"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestExtraModelAttributes = exports.ServiceRequestExtra = void 0;
const sequelize_1 = require("sequelize");
class ServiceRequestExtra extends sequelize_1.Model {
}
exports.ServiceRequestExtra = ServiceRequestExtra;
;
exports.ServiceRequestExtraModelAttributes = {
    ServiceRequestExtraId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceRequestId: {
        allowNull: false,
        references: { model: 'ServiceRequest', key: 'ServiceRequestId' },
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceExtraId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
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
