"use strict";
// 'use strict';
// const {
//   Model
// } = require('DataTypes');
// module.exports = (DataTypes, DataTypes) => {
//   class ContactUs extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of DataTypes lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUs.init({
//     Name: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Subject: DataTypes.STRING,
//     Phonenumber: DataTypes.STRING,
//     Message: DataTypes.STRING,
//     UploadFileName: DataTypes.STRING,
//     CreatedOn: DataTypes.DATE,
//     Status: DataTypes.NUMBER,
//     IsDeleted: DataTypes.BLOB
//   }, {
//     DataTypes,
//     modelName: 'ContactUs',
//   });
//   return ContactUs;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModelAttributes = exports.ContactUs = void 0;
const sequelize_1 = require("sequelize");
class ContactUs extends sequelize_1.Model {
}
exports.ContactUs = ContactUs;
;
exports.ContactUsModelAttributes = {
    ContactUsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Subject: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Phonenumber: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Message: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    UploadFileName: {
        type: sequelize_1.DataTypes.STRING
    },
    Status: {
        type: sequelize_1.DataTypes.BIGINT
    },
    IsDeleted: {
        allowNull: false,
        type: sequelize_1.DataTypes.BLOB
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
