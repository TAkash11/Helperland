import { Joi } from 'celebrate';

const params: object = {
    ContactUsId: Joi.number()
                  .integer()
                  .required()
                  .description('Id of user')
};

export const UserSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                   .required()
                   .example('Akash')
                   .description('Name of user'),
            LastName: Joi.string()
                   .required()
                   .example('Thakkar')
                   .description('sirame of user'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user'),
            Password: Joi.string()
                        .required()
                        .example('Aka0987')
                        .description('Password of User'),
            ConfirmPassword: Joi.string()
                        .required()
                        .example('Aka0987')
                        .description('confirmPassword'),
            Mobile: Joi.number()
                        .required()
                        .example(9979882234)
                        .description('Phone number of user'),
            DateOfBirth: Joi.date()
                       .example('10-08-2000')
                       .description('BirthDate'),
            ZipCode: Joi.string()
                       .example('38001')
                       .description('Zipcode of UserAddress'),
            
        })
    }
};