import {Joi} from "celebrate"


const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const HistorySchema = {
    
    Ratings: {
        body: Joi.object({
                Comments: Joi.string()
                        .example('Helper was good at his work')
                        .description('comment'),
                OnTimeArrival: Joi.number(),
                Friendly: Joi.number(),
                QualityOfService: Joi.number(),
        })
    },
}