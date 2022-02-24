import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequestAddress extends Model {
  Id!: number;
  ServiceRequestId?: number;
  AddressLine1?: string;
  AddressLine2?: string;
  City?: string;
  State?: string;
  PostalCode?: number;
  Mobile?: string;
  Email?: string;
};

export const ServiceRequestAddressModelAttributes: ModelAttributes = {
  Id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ServiceRequestId: {
    allowNull: false,
    references:{ model: 'ServiceRequest', key: 'ServiceRequestId' },
    type: DataTypes.INTEGER
  },
  AddressLine1: {
    type: DataTypes.STRING
  },
  AddressLine2: {
    type: DataTypes.STRING
  },
  City: {
    type: DataTypes.STRING
  },
  State: {
    type: DataTypes.STRING
  },
  PostalCode: {
    type: DataTypes.INTEGER
  },
  Mobile: {
    type: DataTypes.STRING
  },
  Email: {
    type: DataTypes.STRING
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
