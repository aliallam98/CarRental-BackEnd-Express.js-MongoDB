import { Router } from "express";
const router = Router();
import * as categoryController from "./Category.controller.js";
import { allowedFiles, fileUpload } from "../../utils/multer.cloud.js";
import validation from "../../midlleware/validation.js";
import * as categoryValidators from "./Category.validation.js";
import carRouter from '../Car/car.router.js'
import { auth } from "../../midlleware/auth.js";
import { endpoint } from "../Category/Category.endpoint.js";

export default router;


// router.use('/:id',carRouter)

router.get('/search' , categoryController.searchCategory)

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    auth(endpoint.create),
    fileUpload(allowedFiles.image).single("image"),
    validation(categoryValidators.addNewCategory),
    categoryController.addNewCategory
  );
  ///
  ///
  ///
  ///
router
  .route("/:id")
  .put(
    auth(endpoint.update),
    fileUpload(allowedFiles.image).single("image"),
    validation(categoryValidators.updateCategory),
    categoryController.updateCategory
  )
  .delete(
    auth(endpoint.delete),
    validation(categoryValidators.deleteCategory),
    categoryController.deleteCategory
  ).get(validation(categoryValidators.getCategoryById),categoryController.getCategoryById)
