import { ErrorClass } from "../utils/ErrorClass.js"
import { verifyToken } from "../utils/generateAndVerifyToken.js"


export const roles = {
    admin:"Admin",
    user:"User"
}

export const auth= (roles = [])=>{
    return (req,res,next)=>{
        try {
            const {authorization} = req.headers
        if(!authorization?.startsWith(process.env.BEARER_KEY)){
            return next(new ErrorClass("authorization Is Required"))
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if(!token){
            return next(new ErrorClass("Token Is Required"))
        }

        const decoded = verifyToken(token)
        if(!decoded?.id){
            return next(new ErrorClass("In-vaild Payload Data"))
        }

        const user = userModel.findById(decoded.id)
        if(!user){
            return next(new ErrorClass("Not Registered Account"))
        }

        if(!roles.includes(user.role)){
            return next(new ErrorClass("you arre Unauthorized ", 401))
        }
        req.user = user
        next()
        
        } catch (error) {
        return res.json({ message: "Catch error" , err:error?.message })
            
        }
    }
}