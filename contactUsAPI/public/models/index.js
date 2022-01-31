"use strict";
// 'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ContactUsAttachmentDefineModel = exports.ContactUsDefineModel = exports.db = exports.sequelize = exports.Sequelize = void 0;
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config')[env];
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
var sequelize_1 = require("sequelize");
exports.Sequelize = sequelize_1.Sequelize;
var contactus_1 = require("./contactus");
var contactusattachment_1 = require("./contactusattachment");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var ContactUsDefineModel = sequelize.define('ContactUs', __assign({}, contactus_1.ContactUsModelAttributes), {
    tableName: 'ContactUs'
});
exports.ContactUsDefineModel = ContactUsDefineModel;
var ContactUsAttachmentDefineModel = sequelize.define('ContactUsAttachment', __assign({}, contactusattachment_1.ContactUsAttachmentModelAttributes), {
    tableName: 'ContactUsAttachment'
});
exports.ContactUsAttachmentDefineModel = ContactUsAttachmentDefineModel;
exports.db = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel,
    ContactUsAttachment: ContactUsAttachmentDefineModel
};
