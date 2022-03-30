import {Joi} from "celebrate"

const params:Object = {
    ContactUsID: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            Name: Joi.string()
                .required()
                .example('Yashvant')
                .description('Name of user'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            
            Subject: Joi.string()
                .example('abc')
                .description('Subject type'),
            PhoneNumber: Joi.number()
                .required()
                .example('6756443451')
                .description('Phone Number of user'),
            Message: Joi.string()
                .required()
                .example('xyz')
                .description('Message'),
            UploadFileName: Joi.string()
                .example('abc.pdf')
                .description('File'),
            Status: Joi.number()
                .integer()
                .example('0')
                .description('status'),
            IsDeleted: Joi.number()
                .integer()
                .example('0')
                .description('isdeleted'),
        })
    },
}