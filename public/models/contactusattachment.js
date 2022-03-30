"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ContactUsAttachment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUsAttachment.init({
//     ContactUsAttachmentId: DataTypes.INTEGER,
//     Name: DataTypes.STRING,
//     FileName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'ContactUsAttachment',
//   });
//   return ContactUsAttachment;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsAttachmentModelAttributes = exports.ContactUsAttachment = void 0;
const sequelize_1 = require("sequelize");
class ContactUsAttachment extends sequelize_1.Model {
}
exports.ContactUsAttachment = ContactUsAttachment;
;
exports.ContactUsAttachmentModelAttributes = {
    ContactUsAttachmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    FileName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
};
