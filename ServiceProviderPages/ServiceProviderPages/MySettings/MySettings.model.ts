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
                        .example('Yashvant')
                        .description('FirstName of user'),
                LastName: Joi.string()
                        .required()
                        .example('Yashvant')
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
                NationalityId: Joi.number()
                        .integer()
                        .required()
                        .example(1)
                        .description('language comfartable with'),
                Gender: Joi.string()
                        .required()
                        .example('Male/Feale')
                        .description('Gender'),
                Address: Joi.object()
                        .required()
                        .description('address')
           
        })
    },

    ChangePassword: {
        body: Joi.object({
                OldPassword: Joi.string()
                        .required()
                        .example('36900360')
                        .description('password'),
                NewPassword: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('Ya36900369')
                        .description('password'),
                ConfirmPassword: Joi.string()
                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                        .required()
                        .example('Ya36900369')
                        .description('password')
           
        })
    },
}