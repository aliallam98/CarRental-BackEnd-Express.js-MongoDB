import Joi from "joi";
import {generalValidationFields} from '../../midlleware/validation.js'







export const addNewBrand ={
    body:Joi.object().required().keys({
        name:generalValidationFields.name,
    }),
    file:generalValidationFields.file.required(),
    params:Joi.object().required().keys(),
    query:Joi.object().required().keys(),
        }

export const updateBrand ={
    body:Joi.object().required().keys({
        name:generalValidationFields.name,
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
        {brandId:generalValidationFields.id}
    ),
    query:Joi.object().required().keys(),
        }
export const deleteBrand ={
    body:Joi.object().required().keys({
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
        {brandId:generalValidationFields.id}
    ),
    query:Joi.object().required().keys(),
        }
export const searchBrand ={
    body:Joi.object().required().keys({
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
    ),
    query:Joi.object().required().keys(
        {keyWord:generalValidationFields.name}
    ),
        }