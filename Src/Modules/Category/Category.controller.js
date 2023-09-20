import categoryModel from "../../../DB/Models/Category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandling } from "../../utils/errorHandling.js";
import slugify from "slugify";
import { ErrorClass } from "../../utils/ErrorClass.js";
import {getOne , deleteOne} from '../../utils/CodeHandler.js'

///////////
export const gettAllCategories = asyncHandling(async(req, res, next) => {
  const gettAllCategories = await categoryModel.find({})
  return res.status(200).json({ message: "Done" ,gettAllCategories});
});
export const addNewCategory = asyncHandling(async (req, res, next) => {
  req.body.slug = slugify(req.body.name)
  const checkCategoryExisting = await categoryModel.findOne({ name:req.body.name });
  if (checkCategoryExisting) {
    return next(new ErrorClass("This Category already exists", 409));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`RentACarTesting/Category/${req.body.name}`})
  req.body.image =  { secure_url, public_id }
  const category = await categoryModel.create(req.body);
  return res.status(201).json({ message: "Done", category });
});
export const updateCategory = asyncHandling(async (req, res, next) => {
  const {categoryId} = req.params
  console.log(categoryId);
  const checkCategoryExisting = await categoryModel.findById(categoryId);
  if (!checkCategoryExisting) {
    return next(new ErrorClass("This Category Not exists", 404));
  }
  const checkCategoryName = await categoryModel.findOne({name:req.body.name, _id:{$ne:categoryId}})
  if (checkCategoryName) {
    return next(new ErrorClass("This Category already exists", 409));
  }
  if(req.file){
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`RentACarTesting/Category/${req.body.name}`})
    await cloudinary.uploader.destroy(checkCategoryExisting.image.public_id)
    req.body.image = { secure_url, public_id }
  }
  const category = await categoryModel.findByIdAndUpdate(categoryId,req.body,{new:true});
  return res.status(201).json({ message: "Done", category });
});
export const deleteCategory = deleteOne(categoryModel)
export const getCategoryById = getOne(categoryModel)