"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = void 0;
const celebrate_1 = require("celebrate");
exports.SettingsSchema = {
    details: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string(),
            LastName: celebrate_1.Joi.string(),
            Mobile: celebrate_1.Joi.number()
                .integer()
                .min(1000000000)
                .max(9999999999),
            DateOfBirth: celebrate_1.Joi.date()
                .max(Date.now()),
        })
    },
    address: {
        body: celebrate_1.Joi.object({
            AddressLine1: celebrate_1.Joi.string(),
            AddressLine2: celebrate_1.Joi.string(),
            City: celebrate_1.Joi.string(),
            State: celebrate_1.Joi.string(),
            PostalCode: celebrate_1.Joi.string()
                .length(5),
            Mobile: celebrate_1.Joi.number()
                .integer()
                .min(1000000000)
                .max(9999999999),
        })
    },
    passwordChange: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required(),
            NewPassword: celebrate_1.Joi.string()
                .required(),
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
        })
    }
};
