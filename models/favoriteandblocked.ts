import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class FavoriteAndBlocked extends Model{

    Id!:number;
    UserId!:number;
    TargetUserId!:number;
    IsFavorite!: boolean;
    IsBlocked!: boolean;
}

export const FAndBModelAttributes:ModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: DataTypes.INTEGER
      },
      TargetUserId: {
        allowNull: false,
        references: {
          model: 'User',
          key: 'UserId'
        },
        type: DataTypes.INTEGER
      },
      IsFavorite: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      IsBlocked: {
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