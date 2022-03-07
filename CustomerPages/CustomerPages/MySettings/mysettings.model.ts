import { Joi } from "celebrate";

export const SettingsSchema = {
    details: {
        body: Joi.object({
            FirstName: Joi.string(),
            LastName: Joi.string(),
            Mobile: Joi.number()
                       .integer()
                       .min(1000000000)
                       .max(9999999999),
            DateOfBirth: Joi.date()
                            .max(Date.now()),
        })
    },

    address: {
        body: Joi.object({
            AddressLine1: Joi.string(),
            AddressLine2: Joi.string(),
            City: Joi.string(),
            State: Joi.string(),
            Mobile: Joi.number()
                       .integer()
                       .min(1000000000)
                       .max(9999999999),
        })
    },

    passwordChange: {
        body: Joi.object({
            OldPassword: Joi.string()
                            .required(),
            NewPassword: Joi.string()
                            .required(),
            ConfirmPassword: Joi.string()
                                .required()
        })
    }

}