import {Joi} from "celebrate"

export const ResetSchema ={addPassword: {
    body: Joi.object({
        resetLink: Joi.string()
                .required()
                .description('reset link'),
        newPassword: Joi.string()
                .required()
                .description('password of user'),
    })
},
Forgot:{
    body: Joi.object({
        Email:Joi.string()
        .required()
        .email()
    })
}
}
