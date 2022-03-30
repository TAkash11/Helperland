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
                .example('Akash')
                .description('FirstName of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Thakkar')
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
            Address: celebrate_1.Joi.object()
                .required()
        })
    },
    ChangePassword: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required()
                .example('Aka876')
                .description('password'),
            NewPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
                .required()
                .example('Aka987')
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
                .required()
                .example('Aka987')
                .description('password')
        })
    },
};
