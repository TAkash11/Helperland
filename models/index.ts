// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.js')[env];
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

import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactUsModelAttributes } from "./contactus";
import { User, UserModelAttributes } from "./user";
import { UserAddress, UserAddressModelAttributes } from "./useraddress";
import { ServiceRequestAddress, ServiceRequestAddressModelAttributes } from "./servicerequestaddress";
import { ServiceRequest, ServiceRequestModelAttributes } from "./servicerequest";
import { ServiceRequestExtra, ServiceRequestExtraModelAttributes } from "./servicerequestextra";
import { Rating, RatingModelAttributes } from './rating';
import { FavoriteAndBlocked, FAndBModelAttributes } from "./favoriteandblocked";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type ContactUsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};
const ContactUsDefineModel = sequelize.define(
  'ContactUs',
  {
    ...ContactUsModelAttributes
  },
  {
    tableName: 'ContactUs'
  }
) as ContactUsModelStatic;
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};
const UserDefineModel = sequelize.define(
  'User',
  {
    ...UserModelAttributes
  },
  {
    tableName: 'User'
  }
) as UserModelStatic;

type UserAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAddress;
};
const UserAddressDefineModel = sequelize.define(
  'UserAddress',
  {
    ...UserAddressModelAttributes
  },
  {
    tableName: 'UserAddress'
  }
) as UserAddressModelStatic;

type ServiceRequestAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequestAddress;
};
const ServiceRequestAddressDefineModel = sequelize.define(
  'ServiceRequestAddress',
  {
    ...ServiceRequestAddressModelAttributes
  },
  {
    tableName: 'ServiceRequestAddress'
  }
) as ServiceRequestAddressModelStatic;

type ServiceRequestModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequest;
};
const ServiceRequestDefineModel = sequelize.define(
  'ServiceRequest',
  {
    ...ServiceRequestModelAttributes
  },
  {
    tableName: 'ServiceRequest'
  }
) as ServiceRequestModelStatic;

type ServiceRequestExtraModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequestExtra;
};
const ServiceRequestExtraDefineModel = sequelize.define(
  'ServiceRequestExtra',
  {
    ...ServiceRequestExtraModelAttributes
  },
  {
    tableName: 'ServiceRequestExtra'
  }
) as ServiceRequestExtraModelStatic;

type RatingModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Rating;
};
const RatingDefineModel = sequelize.define(
  'Rating',
  {
    ...RatingModelAttributes,
  },
  {
    tableName: 'Rating',
  }
) as RatingModelStatic;

type FaoriteAndBlockModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FavoriteAndBlocked;
};
const FaoriteAndBlockModel = sequelize.define(
  "FavoriteAndBlocked",
  {
    ...FAndBModelAttributes,
  },
  {
    tableName: "FavoriteAndBlocked",
  }
) as FaoriteAndBlockModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  ContactUs: ContactUsModelStatic;
  User: UserModelStatic;
  UserAddress: UserAddressModelStatic;
  ServiceRequestAddress: ServiceRequestAddressModelStatic;
  ServiceRequest: ServiceRequestModelStatic;
  ServiceRequestExtra: ServiceRequestExtraModelStatic;
  Rating: RatingModelStatic;
  FavoriteAndBlocked: FaoriteAndBlockModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  ContactUs: ContactUsDefineModel,
  User: UserDefineModel,
  UserAddress:UserAddressDefineModel,
  ServiceRequestAddress: ServiceRequestAddressDefineModel,
  ServiceRequest: ServiceRequestDefineModel,
  ServiceRequestExtra:ServiceRequestExtraDefineModel,
  Rating: RatingDefineModel,
  FavoriteAndBlocked: FaoriteAndBlockModel
}

db.User.hasMany(db.UserAddress, {
  foreignKey: {
    name: "UserId",
    allowNull: true,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.UserAddress.belongsTo(db.User, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasOne(db.ServiceRequestAddress, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRequestAddress',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequestAddress.belongsTo(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.belongsTo(db.User, {
  foreignKey: {
    name: "UserId",
    allowNull: true,
  },
  as: 'HelperRequest',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasMany(db.ServiceRequestExtra, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: true
  },
  as: 'ExtraService',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasOne(db.Rating, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRating',
  constraints: true,
  onDelete: "CASCADE",
});

db.Rating.belongsTo(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRating',
  constraints: true,
  onDelete: "CASCADE",
});

db.User.hasMany(db.Rating, {
  foreignKey: {
    name: "RatingFrom",
    allowNull: false,
  },
  as: 'RatingFrom',
  constraints: true,
  onDelete: "CASCADE",
});

db.User.hasMany(db.Rating, {
  foreignKey: {
    name: "RatingTo",
    allowNull: false,
  },
  as: 'RatingTo',
  constraints: true,
  onDelete: "CASCADE",
});

export default db;

