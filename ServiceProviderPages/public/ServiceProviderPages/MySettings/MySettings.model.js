"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsSchema = void 0;
const celebrate_1 = require("celebrate");
const header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.MySettingsSchema = {
    UpdateUser: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('FirstName of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName of user'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('30-10-2000')
                .description('birth date of user'),
            NationalityId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('language comfartable with'),
            Gender: celebrate_1.Joi.string()
                .required()
                .example('Male/Feale')
                .description('Gender'),
            Address: celebrate_1.Joi.object()
                .required()
                .description('address')
        })
    },
    ChangePassword: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required()
                .example('36900360')
                .description('password'),
            NewPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('Ya36900369')
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('Ya36900369')
                .description('password')
        })
    },
};
