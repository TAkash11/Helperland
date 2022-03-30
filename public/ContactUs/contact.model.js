"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    ContactUsID: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('Name of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Subject: celebrate_1.Joi.string()
                .example('abc')
                .description('Subject type'),
            PhoneNumber: celebrate_1.Joi.number()
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('xyz')
                .description('Message'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abc.pdf')
                .description('File'),
            Status: celebrate_1.Joi.number()
                .integer()
                .example('0')
                .description('status'),
            IsDeleted: celebrate_1.Joi.number()
                .integer()
                .example('0')
                .description('isdeleted'),
        })
    },
};
