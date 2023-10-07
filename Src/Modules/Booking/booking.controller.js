import bookingModel from "../../../DB/Models/Booking.model.js";
import carModel from "../../../DB/Models/Car.model.js";
import { deleteOne, getOne } from "../../utils/CodeHandler.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { asyncHandling } from "../../utils/errorHandling.js";


export const getAllBookingRequests = asyncHandling(async(req,res,next)=>{
    const requests = await bookingModel.find()
    return res.status(200).json(requests)

})
export const getBookingById = getOne(bookingModel)



export const createBookingRequest = asyncHandling(async(req,res,next)=>{
 const {carId,fullName,mobilePhone,specialRequest,rentalStartDate,rentalEndDate} = req.body

 const isExistCar = await carModel.findById(carId)
 if(!isExistCar) return next(new ErrorClass("Cannot Find This car Check Id" , 404))

    const bookingRequest = await bookingModel.create({
        carId,
        fullName,
        mobilePhone,
        specialRequest,
        rentalStartDate,
        rentalEndDate
    })
    return res.status(201).json({messagne:"Request Sent Once We Recieve it Will Contact You", bookingRequest})
})
export const deleteBookingRequest = deleteOne(bookingModel)
export const changeBookingRequestStatus = asyncHandling(async(req,res,next)=>{
 const {id} = req.params
 const {status} = req.body
    const checkRequest = await bookingModel.findByIdAndUpdate(id,{status})
    if(!checkRequest){
        return res.status(404).json({messagne:"In-vaild Request", checkRequest})
        }
    return res.status(201).json({messagne:"Request Updated Successfully"})

})

