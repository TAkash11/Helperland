import { Joi } from "celebrate";

export const ServiceManagementSchema = {
    RescheduleAdd: {
        body: Joi.object({
            ServiceStartDate: Joi.date().greater(Date.now()),

            ServiceStartTime: Joi.string().valid("8:00:00", "8:30:00","9:00:00", "9:30:00","10:00:00", "10:30:00","11:00:00", "11:30:00","12:00:00", "12:30:00","13:00:00", "13:30:00","14:00:00", "14:30:00","15:00:00", "15:30:00","16:00:00", "16:30:00","17:00:00", "17:30:00","18:00:00"),
            
            Address: Joi.object().keys({
                AddressLine1: Joi.string(),

                AddressLine2: Joi.string(),

                PostalCode: Joi.number().integer().min(100000).max(999999),

                City: Joi.string(),     
            }),

            Reason: Joi.string() 
        })
    }
}