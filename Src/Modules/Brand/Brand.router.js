import { Router } from "express";
const router = Router();
import * as brandController from "./Brand.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as brandValidators from './Brand.validation.js'
import carRouter from '../Car/car.router.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "./Brand.endpoint.js";



// router.use('/:id',carRouter)

router.get("/", brandController.getallBrands);
router.get("/search",validation(brandValidators.searchBrand), brandController.searchBrand);
router.post("/", auth(endpoint.create),fileUpload(allowedFiles.image).single('image'),validation(brandValidators.addNewBrand) ,brandController.addNewBrand);
router.put("/:id", auth(endpoint.update),fileUpload(allowedFiles.image).single('image'),validation(brandValidators.updateBrand) ,brandController.updateBrand);
router.delete("/:id", auth(endpoint.delete),validation(brandValidators.deleteBrand) ,brandController.deleteBrand);

export default router;
    