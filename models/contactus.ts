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


import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUs extends Model {
  ContactUsId!: number;

  Name?: string;

  Email?: string;

  Subject?: string;

  Phonenumber?: string;

  Message?: string;

  UploadFileName?: string;

  CreatedOn?: Date;

  Status?: number;

  IsDeleted?: boolean;

  createdAt!: Date;

  updatedAt!: Date;
};

export const ContactUsModelAttributes: ModelAttributes = {
  ContactUsId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  Name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Subject: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Phonenumber: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Message: {
    allowNull: false,
    type: DataTypes.STRING
  },
  UploadFileName: {
    type: DataTypes.STRING
  },
  Status: {
    type: DataTypes.BIGINT
  },
  IsDeleted: {
    allowNull: false,
    type: DataTypes.BLOB
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}

