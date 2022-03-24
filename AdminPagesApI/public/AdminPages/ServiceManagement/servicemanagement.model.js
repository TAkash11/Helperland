"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManagementSchema = void 0;
const celebrate_1 = require("celebrate");
exports.ServiceManagementSchema = {
    RescheduleAdd: {
        body: celebrate_1.Joi.object({
            ServiceStartDate: celebrate_1.Joi.date().greater(Date.now()),
            ServiceStartTime: celebrate_1.Joi.string().valid("8:00:00", "8:30:00", "9:00:00", "9:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00", "18:00:00"),
            Address: celebrate_1.Joi.object().keys({
                AddressLine1: celebrate_1.Joi.string(),
                AddressLine2: celebrate_1.Joi.string(),
                PostalCode: celebrate_1.Joi.number().integer().min(100000).max(999999),
                City: celebrate_1.Joi.string(),
            }),
            Reason: celebrate_1.Joi.string()
        })
    }
};
