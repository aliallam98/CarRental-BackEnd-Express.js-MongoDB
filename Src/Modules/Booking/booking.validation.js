import joi from 'joi'
import { generalValidationFields } from '../../midlleware/validation.js'


export const createBookingRequest = joi.object().required().keys({
    fullName:generalValidationFields.name,
    mobilePhone:generalValidationFields.name,
    specialRequest:joi.string(),
    rentalStartDatejoi: joi.date().min(Date.now()).message('"date" cannot be earlier than today'),
    rentalEndDate: joi.date().min(Date.now()).message('Enter Invaild Date')
    })

export const deleteBookingRequest = joi.object().required().keys({
    id:generalValidationFields.id
})

export const changeBookingRequestStatus = joi.object().required().keys({
    id:generalValidationFields.id
})

