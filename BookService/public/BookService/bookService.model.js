"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceSchema = void 0;
const celebrate_1 = require("celebrate");
exports.BookServiceSchema = {
    zipcode: {
        body: celebrate_1.Joi.object({
            postalcode: celebrate_1.Joi.string()
                .required()
                .example('38058')
                .description('ZipCode of Area')
        })
    },
    UserAddress: {
        body: celebrate_1.Joi.object({
            AddressLine1: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('address line 1 of user address'),
            AddressLine2: celebrate_1.Joi.string()
                .example('abc')
                .description('address line 2 of user address'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Ahmedabad')
                .description('City of user address'),
            State: celebrate_1.Joi.string()
                .example('Gujarat')
                .description('State of user address'),
            postalcode: celebrate_1.Joi.string()
                .required()
                .length(5)
                .example('38058')
                .description('ZipCode of Area'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('9988776655')
                .description('Mobile number of the user'),
            Email: celebrate_1.Joi.string()
                .example('akash@gmail.com')
                .description('Email address'),
        })
    },
    CreateService: {
        body: celebrate_1.Joi.object({
            ServiceId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('ServiceId'),
            ServiceStartDate: celebrate_1.Joi.date()
                .required()
                .example('13-02-2022')
                .description('Date'),
            ServiceStartTime: celebrate_1.Joi.string()
                .required()
                .example('09:00')
                .description('Time'),
            ServiceHours: celebrate_1.Joi.number()
                .integer()
                .required()
                .example('3')
                .description('Service Hours'),
            Comments: celebrate_1.Joi.string()
                .example('Hi')
                .description('comment'),
            HasPets: celebrate_1.Joi.boolean()
                .required()
                .example('true')
                .description('Have pets at home'),
            ServiceRequestAddress: celebrate_1.Joi.object({
                AddressLine1: celebrate_1.Joi.string()
                    .required()
                    .example('abc')
                    .description('address line 1 of user address'),
                AddressLine2: celebrate_1.Joi.string()
                    .example('abc')
                    .description('address line 2 of user address'),
                City: celebrate_1.Joi.string()
                    .required()
                    .example('Ahmedabad')
                    .description('City of user address'),
                State: celebrate_1.Joi.string()
                    .example('Gujarat')
                    .description('State of user address'),
                postalcode: celebrate_1.Joi.string()
                    .required()
                    .length(5)
                    .example('38058')
                    .description('ZipCode of Area'),
                Mobile: celebrate_1.Joi.string()
                    .required()
                    .length(10)
                    .example('9988776655')
                    .description('Mobile number of the user'),
            }),
            ExtraService: celebrate_1.Joi.array()
        })
    },
};
