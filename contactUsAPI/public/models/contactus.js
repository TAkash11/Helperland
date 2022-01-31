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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ContactUsModelAttributes = exports.ContactUs = void 0;
var sequelize_1 = require("sequelize");
var ContactUs = /** @class */ (function (_super) {
    __extends(ContactUs, _super);
    function ContactUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContactUs;
}(sequelize_1.Model));
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
