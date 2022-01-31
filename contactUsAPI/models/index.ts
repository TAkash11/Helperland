// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config')[env];
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
import { ContactUsAttachment, ContactUsAttachmentModelAttributes } from "./contactusattachment";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type ContactUsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};
type ContactUsAttachmentModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ContactUsAttachment;
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

 const ContactUsAttachmentDefineModel = sequelize.define(
    'ContactUsAttachment',
    {
      ...ContactUsAttachmentModelAttributes
    },
    {
      tableName: 'ContactUsAttachment'
    }
  ) as ContactUsAttachmentModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  ContactUs: ContactUsModelStatic;
  ContactUsAttachment: ContactUsAttachmentModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  ContactUs: ContactUsDefineModel,
  ContactUsAttachment: ContactUsAttachmentDefineModel
}

export {ContactUsDefineModel};
export{ContactUsAttachmentDefineModel};