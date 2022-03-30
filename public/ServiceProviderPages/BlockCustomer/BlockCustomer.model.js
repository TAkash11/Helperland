"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCustomerSchema = void 0;
const celebrate_1 = require("celebrate");
const header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.BlockCustomerSchema = {
    Blocked: {
        body: celebrate_1.Joi.object({
            IsBlocked: celebrate_1.Joi.boolean()
                .required()
                .example('true')
        })
    }
};
