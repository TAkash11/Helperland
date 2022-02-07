// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Password: DataTypes.STRING,
//     Mobile: DataTypes.STRING,
//     UserTypeId: DataTypes.NUMBER,
//     DateOfBirth: DataTypes.DATE,
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     IsApproved: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model {
  UserId!: number;

  FirstName!: string;

  LastName!: string;

  Email!: string;

  Password!: string;

  Mobile!: string;

  UserTypeId!: number;

  DateOfBirth?: Date;

  IsRegisteredUser!: boolean;

  IsApprovedUser!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
};

export const UserModelAttributes: ModelAttributes = {
  UserId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  FirstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  LastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Mobile: {
    allowNull: false,
    type: DataTypes.STRING
  },
  UserTypeId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  DateOfBirth: {
    allowNull: true,
    type: DataTypes.DATE
  },
  IsRegisteredUser: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  IsApprovedUser: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
