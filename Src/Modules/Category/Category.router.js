import { Router } from "express";
const router = Router();
import * as categoryController from "./Category.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as categoryValidators from "./Category.validation.js";
import carRouter from '../Car/car.router.js'

export default router;


router.use('/:id',carRouter)

router
  .route("/")
  .get(categoryController.gettAllCategories)
  .post(
    fileUpload(allowedFiles.image).single("image"),
    validation(categoryValidators.addNewCategory),
    categoryController.addNewCategory
  );
  ///
router
  .route("/:id")
  .put(
    fileUpload(allowedFiles.image).single("image"),
    validation(categoryValidators.updateCategory),
    categoryController.updateCategory
  )
  .delete(
    validation(categoryValidators.deleteCategory),
    categoryController.deleteCategory
  ).get(validation(categoryValidators.getCategoryById),categoryController.getCategoryById)
