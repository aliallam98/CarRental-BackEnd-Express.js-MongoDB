import userModel from "../../../DB/Models/User.model.js"
import { ErrorClass } from "../../utils/ErrorClass.js"
import { asyncHandling } from "../../utils/errorHandling.js"
import { generateToken } from "../../utils/generateAndVerifyToken.js"
import { compare, hash } from "../../utils/hashAndCompare.js"




export const signUp = asyncHandling(async (req,res,next)=>{
    let {userName,password} = req.body

    const isUserExist = await userModel.findOne({userName})
    if(isUserExist) return next(new ErrorClass(`Cannot USe This UserName : ${userName} its Exist`, 409 ))
    password = hash({plainText:password})

    const newUser = await userModel.create({userName,password})
    return res.status(201).json({message:"Done",newUser})
})
export const logIn = asyncHandling(async (req,res,next)=>{
    let {userName,password} = req.body

    const isUserExist = await userModel.findOne({userName})
    if(!isUserExist) return next(new ErrorClass(`Username Or Password Is Wrong`, 401 ))

    const isPasswordMatch = compare({plainText:password,hashValue:isUserExist.password})
    if(!isPasswordMatch) return next(new ErrorClass(`Username Or Password Is Wrong`, 401 ))

    const payload = {
        id:isUserExist._id,
        userName,
        isLoggedIn:isUserExist.isLoggedIn
    }
    const token = generateToken({payload})
    isUserExist.isLoggedIn = true
    await isUserExist.save()
    return res.status(200).json({message:"Done",token})
})
export const logOut = asyncHandling(async (req,res,next)=>{
    await userModel.findByIdAndUpdate(req.user._id,{isLoggedIn:false})
    return res.status(200).json({message:"Logged Out"})
})
export const changePassword = asyncHandling(async (req,res,next)=>{
    let {oldPassword,newPassword} = req.body

    if(oldPassword !== req.user.password) return next(new ErrorClass(`Old Password Is Wrong`, 400 ))
    newPassword = hash({plainText:newPassword})
    await findByIdAndUpdate(req.user._id,{password:newPassword})
    return res.status(200).json({message:"Password Changed"})
})