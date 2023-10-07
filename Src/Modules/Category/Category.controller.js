import categoryModel from "../../../DB/Models/Category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandling } from "../../utils/errorHandling.js";
import slugify from "slugify";
import { ErrorClass } from "../../utils/ErrorClass.js";
import {getOne , deleteOne} from '../../utils/CodeHandler.js'

///////////
export const getAllCategories = asyncHandling(async(req, res, next) => {
  const getAllCategories = await categoryModel.find({})
  return res.status(200).json({ message: "Done" ,getAllCategories});
});
export const getCategoryById = getOne(categoryModel)

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
  const {id} = req.params
  const checkCategoryExisting = await categoryModel.findById(id);
  if (!checkCategoryExisting) {
    return next(new ErrorClass("This Category Not exists", 404));
  }
  const checkCategoryName = await categoryModel.findOne({name:req.body.name, _id:{$ne:id}})
  if (checkCategoryName) {
    return next(new ErrorClass("This Category already exists", 409));
  }
  if(req.file){
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`RentACarTesting/Category/${req.body.name || checkCategoryExisting.name }`})
    if(checkCategoryExisting.image?.public_id){
      await cloudinary.uploader.destroy(checkCategoryExisting.image.public_id)
    }
    req.body.image = { secure_url, public_id }
  }
  const category = await categoryModel.findByIdAndUpdate(id,req.body,{new:true});
  return res.status(201).json({ message: "Done", category });
});
export const deleteCategory = deleteOne(categoryModel)

export const  searchCategory =  asyncHandling(async(req,res,next)=>{
  const {keyWord}= req.query
  console.log(keyWord);
  const searchResult = await categoryModel.find({
    $or:[
      {name:{$regex:`${keyWord}`}},
      {description:{$regex:`${keyWord}`}}
    ]
  })
  return res.status(200).json({ message: "Done", searchResult });
})