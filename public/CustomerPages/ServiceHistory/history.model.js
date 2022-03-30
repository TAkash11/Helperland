"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
const celebrate_1 = require("celebrate");
const header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.HistorySchema = {
    Ratings: {
        body: celebrate_1.Joi.object({
            Comments: celebrate_1.Joi.string()
                .example('Helper was good at his work')
                .description('comment'),
            OnTimeArrival: celebrate_1.Joi.number(),
            Friendly: celebrate_1.Joi.number(),
            QualityOfService: celebrate_1.Joi.number(),
        })
    },
};
