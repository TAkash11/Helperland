"use strict";
// 'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = exports.Sequelize = void 0;
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
// const db = {};
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = db;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const user_1 = require("./user");
const useraddress_1 = require("./useraddress");
const servicerequestaddress_1 = require("./servicerequestaddress");
const servicerequest_1 = require("./servicerequest");
const servicerequestextra_1 = require("./servicerequestextra");
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
const UserDefineModel = sequelize.define('User', Object.assign({}, user_1.UserModelAttributes), {
    tableName: 'User'
});
const UserAddressDefineModel = sequelize.define('UserAddress', Object.assign({}, useraddress_1.UserAddressModelAttributes), {
    tableName: 'UserAddress'
});
const ServiceRequestAddressDefineModel = sequelize.define('ServiceRequestAddress', Object.assign({}, servicerequestaddress_1.ServiceRequestAddressModelAttributes), {
    tableName: 'ServiceRequestAddress'
});
const ServiceRequestDefineModel = sequelize.define('ServiceRequest', Object.assign({}, servicerequest_1.ServiceRequestModelAttributes), {
    tableName: 'ServiceRequest'
});
const ServiceRequestExtraDefineModel = sequelize.define('ServiceRequestExtra', Object.assign({}, servicerequestextra_1.ServiceRequestExtraModelAttributes), {
    tableName: 'ServiceRequestExtra'
});
exports.db = {
    sequelize: sequelize,
    User: UserDefineModel,
    UserAddress: UserAddressDefineModel,
    ServiceRequestAddress: ServiceRequestAddressDefineModel,
    ServiceRequest: ServiceRequestDefineModel,
    ServiceRequestExtra: ServiceRequestExtraDefineModel,
};
exports.db.User.hasMany(exports.db.UserAddress, {
    foreignKey: {
        name: "UserId",
        allowNull: true,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.UserAddress.belongsTo(exports.db.User, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasOne(exports.db.ServiceRequestAddress, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequestAddress.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasMany(exports.db.ServiceRequestExtra, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: true
    },
    as: 'ExtraService',
    constraints: true,
    onDelete: "CASCADE",
});
exports.default = exports.db;
