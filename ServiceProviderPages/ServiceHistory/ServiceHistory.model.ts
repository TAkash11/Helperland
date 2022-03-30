import {Joi} from "celebrate"


const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const ServiceHistorySchema = {
    
}