"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    ContactUsId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of user')
};
exports.UserSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Akash')
                .description('Name of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Thakkar')
                .description('sirame of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Password: celebrate_1.Joi.string()
                .required()
                .example('Aka0987')
                .description('Password of User'),
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
                .example('Aka0987')
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.number()
                .required()
                .example(9979882234)
                .description('Phone number of user'),
            DateOfBirth: celebrate_1.Joi.date()
                .example('10-08-2000')
                .description('BirthDate'),
        })
    }
};
