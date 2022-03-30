import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string()
                    .required()
};

const params1: object = {
        id: Joi.number()
            .integer()
            .required()
            .description('Id of User')
    };

export const DashboardSchema = {}