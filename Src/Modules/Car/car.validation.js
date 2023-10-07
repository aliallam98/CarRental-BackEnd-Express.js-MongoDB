import Joi from "joi";
import {generalValidationFields} from '../../midlleware/validation.js'



export const addNewCar ={
    body: Joi.object().required().keys({
        name:generalValidationFields.name.required(),
        color:generalValidationFields.name.required(),
        modelYear:generalValidationFields.number.required(),
        seater:generalValidationFields.number.required(),
        powerHourse:generalValidationFields.name.required(),
        categoryId:generalValidationFields.id.required(),
        brandId:generalValidationFields.id.required(),
        KilometersIncluded:generalValidationFields.name.required(),
        rentalCost:generalValidationFields.name.required(),
    }),
    params:Joi.object().required().keys(),
    query:Joi.object().required().keys(),
    files:Joi.object().required().keys({
        image:Joi.array().items(generalValidationFields.file.required()).max(1).required(), 
        images:Joi.array().items(generalValidationFields.file).max(5)
})
}
export const updateCar ={
    body: Joi.object().required().keys({
        name:generalValidationFields.name,
        color:generalValidationFields.name,
        modelYear:generalValidationFields.number,
        seater:generalValidationFields.number,
        powerHourse:generalValidationFields.name,
        categoryId:generalValidationFields.id,
        brandId:generalValidationFields.id,
        KilometersIncluded:generalValidationFields.name,
        rentalCost:generalValidationFields.name,
    }),
    params:Joi.object().required().keys(),
    query:Joi.object().required().keys(),
    files:Joi.object().required().keys({
        image:Joi.array().items(generalValidationFields.file.required()).max(1), 
        images:Joi.array().items(generalValidationFields.file).max(5)
})
}
export const deleteCar ={
    body: Joi.object().required().keys(),
    params:Joi.object().required().keys({
        id:generalValidationFields.id.required()
    }),
    query:Joi.object().required().keys(),
    file:generalValidationFields.file
}
export const getCarById ={
    body: Joi.object().required().keys(),
    params:Joi.object().required().keys({
        id:generalValidationFields.id.required()
    }),
    query:Joi.object().required().keys(),
    file:generalValidationFields.file
}
