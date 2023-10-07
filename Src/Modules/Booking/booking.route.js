import { Router } from "express";
const router = Router();
import * as bookingController from "./booking.controller.js";
import validation from '../../midlleware/validation.js'
import * as bookingValiditors from './booking.validation.js'
import { endpoint } from "./booking.endpoint.js";
import { auth } from "../../midlleware/auth.js";

router
  .route("/")
  .post(validation(bookingValiditors.createBookingRequest),bookingController.createBookingRequest)
  .get(auth(endpoint.get),bookingController.getAllBookingRequests);
router
  .route("/:bookingId")
  .patch(auth(endpoint.change),validation(bookingValiditors.createBookingRequest),bookingController.changeBookingRequestStatus)
  .delete(auth(endpoint.delete),validation(bookingValiditors.deleteBookingRequest),bookingController.deleteBookingRequest)
  .get(auth(endpoint.get),bookingController.getBookingById);



export default router;
