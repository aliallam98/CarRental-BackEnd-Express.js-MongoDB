import mongoose, { Schema, model } from "mongoose";


const userSchema = {
    firstName:{
        type:String, required:true
    },
    lasttName:{
        type:String, required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required: true,
        trim:true
    }
}

const userModel = mongoose.models.User || model("User", userSchema)

export default userModel