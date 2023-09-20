

import Joi from "joi";
import {generalValidationFields} from '../../midlleware/validation.js'







export const addNewCategory ={
    body:Joi.object().required().keys({
        name:generalValidationFields.name,
        description:generalValidationFields.name
    }),
    file:generalValidationFields.file.required(),
    params:Joi.object().required().keys(),
    query:Joi.object().required().keys(),
        }
export const updateCategory ={
    body:Joi.object().required().keys({
        name:generalValidationFields.name,
        description:generalValidationFields.name
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
        {id:generalValidationFields.id}
    ),
    query:Joi.object().required().keys(),
        }
export const deleteCategory ={
    body:Joi.object().required().keys({
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
        {id:generalValidationFields.id}
    ),
    query:Joi.object().required().keys(),
        }
export const getCategoryById ={
    body:Joi.object().required().keys({
    }),
    file:generalValidationFields.file,
    params:Joi.object().required().keys(
        {id:generalValidationFields.id}
    ),
    query:Joi.object().required().keys(
        {keyWord:generalValidationFields.name}
    ),
        }