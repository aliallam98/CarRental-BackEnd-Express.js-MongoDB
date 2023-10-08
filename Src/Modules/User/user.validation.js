import joi from 'joi'


 export const signUp = {
    body:joi.object().required().keys({
        userName:joi.string().min(2).max(25).required(),
        password:joi.string().min(6).max(25).required(),
    }),
    params:joi.object().required().keys(),
    query:joi.object().required().keys(),
    file:joi.object().required().keys()
 }
 export const logIn = {
    body:joi.object().required().keys({
        userName:joi.string().required(),
        password:joi.string().required(),
    }),
    params:joi.object().required().keys(),
    query:joi.object().required().keys(),
    file:joi.object().required().keys()
 }
 export const changePassword = {
    body:joi.object().required().keys({
        oldPassword:joi.string().required(),
        newPassword:joi.string().required(),
        confirmNewPassword:joi.string().valid(joi.ref("newPassword")).required(),

    }),
    params:joi.object().required().keys(),
    query:joi.object().required().keys(),
    file:joi.object().required().keys()
 }
