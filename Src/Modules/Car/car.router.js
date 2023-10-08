import { Router } from "express";
const router = Router();
import * as carController from "./car.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as carValidators from './car.validation.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "./car.endpoint.js";

router.route('/').get(carController.getAllCars)
.post(
  auth(endpoint.create),
  fileUpload(allowedFiles.image).fields([
    {
      name: "image",
      maxCount: "1",
    },
    { name: "images",
     maxCount: "10" },
  ]),
  validation(carValidators.addNewCar)
  ,

  carController.addNewCar
)




router.route('/:id')
.delete(
  auth(endpoint.delete),
  validation(carValidators.deleteCar),
  carController.deleteCarById
)
.put(
  auth(endpoint.update),
  fileUpload(allowedFiles.image).fields([
    {
      name: "image",
      maxCount: "1",
    },
    { name: "images",
     maxCount: "10" },
  ]),
  validation(carValidators.updateCar)
  ,
  carController.updateCarById
)
.get(validation(carValidators.getCarById),carController.getCarById);



router.get("/orderby=date", carController.orderByDate);
router.get("/orderby=price", carController.orderByPrice);
router.get("/orderby=price-desc", carController.orderByPriceDesc);


export default router;
