"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSchema = void 0;
const celebrate_1 = require("celebrate");
exports.DashboardSchema = {
    reschedule: {
        body: celebrate_1.Joi.object({
            ServiceStartDate: celebrate_1.Joi.date().greater(Date.now()).required(),
            ServiceStartTime: celebrate_1.Joi.string().valid("8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00").required(),
        })
    },
    cancle: {
        body: celebrate_1.Joi.object({
            Reason: celebrate_1.Joi.string().required(),
        })
    },
};
