"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAndBModelAttributes = exports.FavoriteAndBlocked = void 0;
const sequelize_1 = require("sequelize");
class FavoriteAndBlocked extends sequelize_1.Model {
}
exports.FavoriteAndBlocked = FavoriteAndBlocked;
exports.FAndBModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    UserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId'
        },
        type: sequelize_1.DataTypes.INTEGER
    },
    TargetUserId: {
        allowNull: false,
        references: {
            model: 'User',
            key: 'UserId'
        },
        type: sequelize_1.DataTypes.INTEGER
    },
    IsFavorite: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsBlocked: {
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
    }
};
