import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class UserAddress extends Model {
  
  AddressId!: number;

  UserId!: number;

  AddressLine1!: string;

  City!: string;

  State!: string;

  PostalCode!: string;

  IsDefault!: boolean;

  IsDeleted!: boolean;

  Mobile!: string;

  Email!: string;

  UserTypeId!: number;
};

export const UserAddressModelAttributes: ModelAttributes = {
  AddressId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  UserId: {
    allowNull: false,
    references:{ model: 'User', key: 'UserId' },
    type: DataTypes.INTEGER   
  },
  AddressLine1: {
    allowNull: false,
    type: DataTypes.STRING
  },
  AddressLine2: {
    allowNull: true,
    type: DataTypes.STRING
  },
  City: {
    allowNull: false,
    type: DataTypes.STRING
  },
  State: {
    allowNull: false,
    type: DataTypes.STRING
  },
  PostalCode: {
    allowNull: false,
    type: DataTypes.STRING
  },
  IsDefault: {
    // allowNull: false,
    type: DataTypes.BOOLEAN
  },
  IsDeleted: {
    // allowNull: false,
    type: DataTypes.BOOLEAN
  },
  Mobile: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  UserTypeId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}
