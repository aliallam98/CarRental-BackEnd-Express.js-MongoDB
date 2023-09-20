import joi from 'joi'
import {Types} from 'mongoose'


const validateObjectId = (value, helper) => {
    // console.log({ value });
    // console.log(helper);
    return Types.ObjectId.isValid(value)
      ? true
      : helper.message("In-valid objectId");
  };
  

export const generalValidationFields = {


    name:joi.string().required(),
    id:joi.string().custom(validateObjectId).required(),

    //File
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
      })
};




const dataMethods = ['body', 'params', 'query', 'file', 'headers' , 'files']

const validation = (schema)=>{
    return (req,res,next)=>{
        const validationErrors = []
        dataMethods.forEach(key => {
            if(schema[key]){
                const validationReslut = schema[key].validate(req[key],{abortEarly:false})
                if(validationReslut.error){
                    validationErrors.push(validationReslut.error.details)
                }
            }
        });
        if(validationErrors.length){
            return res.json({message:"Errors",validationErrors})
        }
        return next()
    }
}

export default validation