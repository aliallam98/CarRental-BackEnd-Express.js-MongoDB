import { Router } from "express";
const router = Router();
import * as carController from "./car.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";

router.get("/", carController.getAllCars);
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
  carController.addNewCar
);




router.get("/orderby=date", carController.orderByDate);
router.get("/orderby=price", carController.orderByPrice);
router.get("/orderby=price-desc", carController.orderByPriceDesc);


export default router;
