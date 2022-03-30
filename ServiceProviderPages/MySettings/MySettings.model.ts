import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string()
                    .required()
};

export const MySettingsSchema = {
    UpdateUser: {
        body: Joi.object({
                FirstName: Joi.string()
                        .required()
                        .example('Akash')
                        .description('FirstName of user'),
                LastName: Joi.string()
                        .required()
                        .example('Thakkar')
                        .description('LastName of user'),
                Mobile: Joi.string()
                        .length(10)
                        .required()
                        .example('6756443451')
                        .description('Phone Number of user'),
                DateOfBirth: Joi.string()
                        .required()
                        .example('30-10-2000')
                        .description('birth date of user'),
                Address: Joi.object()
                        .required()
           
        })
    },

    ChangePassword: {
        body: Joi.object({
                OldPassword: Joi.string()
                        .required()
                        .example('Aka876')
                        .description('password'),
                NewPassword: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
                        .required()
                        .example('Aka987')
                        .description('password'),
                ConfirmPassword: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
                        .required()
                        .example('Aka987')
                        .description('password')
           
        })
    },
}