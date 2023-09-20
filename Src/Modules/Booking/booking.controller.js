import bookingModel from "../../../DB/Models/Booking.model.js";
import { asyncHandling } from "../../utils/errorHandling.js";




export const createBookingRequest = asyncHandling(async(req,res,next)=>{
 const {fullName,mobilePhone,specialRequest,rentalStartDate,rentalEndDate} = req.body

    const bookingRequest = await bookingModel.create({
        fullName,
        mobilePhone,
        specialRequest,
        rentalStartDate,
        rentalEndDate
    })
    return res.status(201).json({messagne:"Request Sent Once We Recieve it Will Contact You", bookingRequest})
})
export const deleteBookingRequest = asyncHandling(async(req,res,next)=>{
 const {id} = req.params
    const checkRequest = await bookingModel.findByIdAndDelete(id)
    if(!checkRequest){
    return res.status(404).json({messagne:"In-vaild Request", checkRequest})
    }
    return res.status(201).json({messagne:"Request Deleted Successfully"})
    
})
export const changeBookingRequestStatus = asyncHandling(async(req,res,next)=>{
 const {id} = req.params
 const {status} = req.body
    const checkRequest = await bookingModel.findByIdAndUpdate(id,{status})
    if(!checkRequest){
        return res.status(404).json({messagne:"In-vaild Request", checkRequest})
        }
    return res.status(201).json({messagne:"Request Updated Successfully"})

})
export const getAllBookingRequests = asyncHandling(async(req,res,next)=>{
    const requests = await bookingModel.find()
    return res.status(200).json(requests)

})


