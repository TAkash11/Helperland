"use strict";
exports.__esModule = true;
exports.LoginSchema = void 0;
var celebrate_1 = require("celebrate");
exports.LoginSchema = {
    Login: {
        body: celebrate_1.Joi.object({
            resetLink: celebrate_1.Joi.string()
                .required()
                .description('resetlink'),
            newPassword: celebrate_1.Joi.string()
                .required()
                .description('password')
        })
    }
};
