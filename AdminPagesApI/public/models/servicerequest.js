"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestModelAttributes = exports.ServiceRequest = void 0;
const sequelize_1 = require("sequelize");
class ServiceRequest extends sequelize_1.Model {
}
exports.ServiceRequest = ServiceRequest;
;
exports.ServiceRequestModelAttributes = {
    ServiceRequestId: {
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
    ServiceId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceStartDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    ServiceStartTime: {
        allowNull: false,
        type: sequelize_1.DataTypes.TIME
    },
    ServiceHourlyRate: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ServiceHours: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    ExtraHours: {
        type: sequelize_1.DataTypes.FLOAT
    },
    SubTotal: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    TotalCost: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING
    },
    ServiceProviderId: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    HasPets: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ModifiedDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING
    }
};
