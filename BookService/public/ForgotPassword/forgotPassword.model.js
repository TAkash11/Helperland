"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetSchema = void 0;
const celebrate_1 = require("celebrate");
exports.ResetSchema = { addPassword: {
        body: celebrate_1.Joi.object({
            resetLink: celebrate_1.Joi.string()
                .required()
                .description('reset link'),
            newPassword: celebrate_1.Joi.string()
                .required()
                .description('password of user'),
        })
    }
};
