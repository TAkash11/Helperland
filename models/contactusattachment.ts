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


import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUsAttachment extends Model{

  ContactUsAttachmentId!: bigint;

  Name?:string;

  FileName?:string;
};

export const ContactUsAttachmentModelAttributes: ModelAttributes ={
  ContactUsAttachmentId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  Name: {
    allowNull: false,
     type: DataTypes.STRING
   },
   FileName: {
     allowNull: false,
     type: DataTypes.STRING
   }
 }