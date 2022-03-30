"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingModelAttributes = exports.Rating = void 0;
const sequelize_1 = require("sequelize");
class Rating extends sequelize_1.Model {
}
exports.Rating = Rating;
exports.RatingModelAttributes = {
    RatingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Ratings: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING(2000)
    },
    RatingDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    OnTimeArrival: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    Friendly: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
    },
    QualityOfService: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(2, 1)
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
