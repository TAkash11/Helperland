import {Joi} from "celebrate";
import { join } from "path/posix";

export const BookServiceSchema = {
    zipcode: {
        body: Joi.object({
            postalcode: Joi.string()
                           .required()
                           .example('38058')
                           .description('ZipCode of Area')
        })
    },
    UserAddress: {
        body: Joi.object({
            AddressLine1: Joi.string()
                             .required()
                             .example('abc')
                             .description('user addressline1'),
            AddressLine2: Joi.string()
                             .example('abc')
                             .description('user addressline2'),
            City: Joi.string()
                     .required()
                     .example('Ahmedabad')
                     .description('City of user address'),
            State: Joi.string()
                      .example('Gujarat')
                      .description('State of user address'),
        //     PostalCode: Joi.string()
        //               .required()
        //               .length(5)
        //               .example('38058')
        //               .description('ZipCode of Area'),
            Mobile: Joi.string()
                       .required()
                       .length(10)
                       .example('9927259873')
                       .description('Mobile number of the user'),
        //     Email: Joi.string()
        //                .example('akash@gmail.com')
        //                .description('Email address'),
        })
           
        
    },

    CreateService: {
        body: Joi.object({
                ServiceId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('ServiceId'),
                ServiceStartDate: Joi.date()
                        .required()
                        .example('10-02-2022')
                        .description('Date'),
                ServiceStartTime: Joi.string()
                        .required()
                        .example('09:00:00')
                        .description('Time'),
                ServiceHours: Joi.number()
                        .integer()
                        .required()
                        .example('3')
                        .description('Service Hours'),
                Comments: Joi.string()
                        .example('Hi')
                        .description('comment'),
                HasPets: Joi.boolean()
                        .required()
                        .example('true')
                        .description('Have pets at home'),
                ServiceRequestAddress: Joi.object()
                        .required(),
                ExtraService: Joi.array()
        })
    },
}