import { Router } from "express";
const router = Router();
import * as bookingController from "./booking.controller.js";
import {validation} from "../../midlleware/validation.js";
import * as bookingValiditors from './booking.validation.js'

router
  .route("/")
  .post(validation(bookingValiditors.createBookingRequest),bookingController.createBookingRequest)
  .get(bookingController.getAllBookingRequests);
router
  .route("/:id")
  .patch(validation(bookingValiditors.createBookingRequest),bookingController.changeBookingRequestStatus)
  .delete(validation(bookingValiditors.deleteBookingRequest),bookingController.deleteBookingRequest);



export default router;
