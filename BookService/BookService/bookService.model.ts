import {Joi} from "celebrate"

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
                             .description('address line 1 of user address'),
            AddressLine2: Joi.string()
                             .example('abc')
                             .description('address line 2 of user address'),
            City: Joi.string()
                     .required()
                     .example('Ahmedabad')
                     .description('City of user address'),
            State: Joi.string()
                      .example('Gujarat')
                      .description('State of user address'),
            postalcode: Joi.string()
                      .required()
                      .length(5)
                      .example('38058')
                      .description('ZipCode of Area'),
            Mobile: Joi.string()
                       .required()
                       .length(10)
                       .example('9988776655')
                       .description('Mobile number of the user'),
            Email: Joi.string()
                       .example('akash@gmail.com')
                       .description('Email address'),
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
                        .example('13-02-2022')
                        .description('Date'),
                ServiceStartTime: Joi.string()
                        .required()
                        .example('09:00')
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
                ServiceRequestAddress: Joi.object({
                    AddressLine1: Joi.string()
                                     .required()
                                     .example('abc')
                                     .description('address line 1 of user address'),
                    AddressLine2: Joi.string()
                                      .example('abc')
                                      .description('address line 2 of user address'),
                    City: Joi.string()
                                .required()
                                .example('Ahmedabad')
                                .description('City of user address'),
                    State: Joi.string()
                                .example('Gujarat')
                                .description('State of user address'),
                    postalcode: Joi.string()
                                .required()
                                .length(5)
                                .example('38058')
                                .description('ZipCode of Area'),
                    Mobile: Joi.string()
                                .required()
                                .length(10)
                                .example('9988776655')
                                .description('Mobile number of the user'),
                            }),
                    
                        
                ExtraService: Joi.array()
        })
    },
}