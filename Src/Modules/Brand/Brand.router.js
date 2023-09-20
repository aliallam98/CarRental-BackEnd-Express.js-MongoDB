import { Router } from "express";
const router = Router();
import * as brandController from "./Brand.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as brandValidators from './Brand.validation.js'
import carRouter from '../Car/car.router.js'



router.use('/:id',carRouter)

router.get("/", brandController.getallBrands);
router.get("/searchbyname",validation(brandValidators.searchBrand), brandController.searchBrand);
router.post("/",fileUpload(allowedFiles.image).single('image'),validation(brandValidators.addNewBrand) ,brandController.addNewBrand);
router.put("/:brandId",fileUpload(allowedFiles.image).single('image'),validation(brandValidators.updateBrand) ,brandController.updateBrand);
router.delete("/:brandId",validation(brandValidators.deleteBrand) ,brandController.deleteBrand);

export default router;
    