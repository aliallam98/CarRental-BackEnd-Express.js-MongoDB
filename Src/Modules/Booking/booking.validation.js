import joi from 'joi'
import { generalValidationFields } from '../../midlleware/validation.js'


export const createBookingRequest = {
    body:joi.object().required().keys({
        carId:generalValidationFields.id.required(),
        fullName:generalValidationFields.name.required(),
        mobilePhone:generalValidationFields.name.required(),
        specialRequest:joi.string(),
        rentalStartDate: joi.date().min(Date.now()).message('"date" cannot be earlier than today'),
        rentalEndDate: joi.date().min(Date.now()).message('Enter Invaild Date')
}),
    params:joi.object().required().keys(),
    query:joi.object().required().keys(),
    file:generalValidationFields.file
}




export const deleteBookingRequest = {
    body:joi.object().required().keys(),
    params:joi.object().required().keys({
        bookingId:generalValidationFields.id
    }),
    query:joi.object().required().keys(),
    file:generalValidationFields.file
}

export const changeBookingRequestStatus = {
    body:joi.object().required().keys(),
    params:joi.object().required().keys({
        bookingId:generalValidationFields.id
    }),
    query:joi.object().required().keys(),
    file:generalValidationFields.file
}
