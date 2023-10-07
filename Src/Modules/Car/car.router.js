import { Router } from "express";
const router = Router();
import * as carController from "./car.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as carValidators from './car.validation.js'

router.get("/", carController.getAllCars);
router.get("/:id", validation(carValidators.getCarById),carController.getCarById);
router.post(
  "/",
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
);
router.put(
  "/:id",
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
);
router.delete(
  "/:id",
  validation(carValidators.deleteCar),
  carController.deleteCarById
);






router.get("/orderby=date", carController.orderByDate);
router.get("/orderby=price", carController.orderByPrice);
router.get("/orderby=price-desc", carController.orderByPriceDesc);


export default router;
