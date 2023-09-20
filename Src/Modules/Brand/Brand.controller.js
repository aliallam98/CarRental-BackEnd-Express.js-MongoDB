import categoryModel from "../../../DB/Models/Category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandling } from "../../utils/errorHandling.js";
import brandModel from "../../../DB/Models/Brand.model.js";
import slugify from "slugify";

///////////
export const getallBrands = asyncHandling(async(req, res, next) => {
  const brands  = await brandModel.find({})
  return res.status(200).json({ message: "Done",brands });
});

export const addNewBrand = asyncHandling(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const checkBrandExisting = await brandModel.findOne({ name: req.body.name });
  if (checkBrandExisting) {
    return next(new Error("This Category already exists", { cause: 409 }));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `RentACarTesting/Brand/${req.body.name}` }
  );
  req.body.image = { secure_url, public_id };
  const brand = await brandModel.create(req.body);
  return res.status(201).json({ message: "Done", brand });
});
export const updateBrand = asyncHandling(async (req, res, next) => {
const {brandId}=req.params;
  const checkBrandExisting = await brandModel.findById(brandId);
  if (!checkBrandExisting) {
    return next(new Error("This Brand Not exists", { cause: 404 }));
  }
  const checkBrandName = await brandModel.findOne({name:req.body.name , _id:{$ne:brandId}})
  if (checkBrandName) {
    return next(new Error(`This Brand name:${req.body.name} exists`, { cause: 400 }));
  }
  if(req.file){
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`RentACarTesting/Brand/${req.body.name}`})
    await cloudinary.uploader.destroy(checkBrandExisting.image.public_id)
    req.body.image = { secure_url, public_id }
  }
  const brand = await brandModel.findByIdAndUpdate(brandId,req.body,{new:true});
  return res.status(200).json({ message: "Done", brand });
});

export const deleteBrand = asyncHandling(async (req, res, next) => {
  const {brandId} = req.params
  const checkBrandExisting = await brandModel.findByIdAndDelete(brandId);
  if (!checkBrandExisting) {
    return next(new Error("This Brand Not Found", { cause: 404 }));
  }
  return res.status(201).json({ message: "Deleted" });
});

export const searchBrand = asyncHandling(async (req, res, next) => {
  const {keyWord} = req.query
  const searchResult = await brandModel.find({name:{$regex:`${keyWord}`}})
  return res.status(201).json({ message: "Done", searchResult });
});
