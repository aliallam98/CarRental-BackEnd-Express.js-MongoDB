import brandModel from "../../../DB/Models/Brand.model.js";
import carModel from "../../../DB/Models/Car.model.js";
import categoryModel from "../../../DB/Models/Category.model.js";
import { deleteOne, getOne } from "../../utils/CodeHandler.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { ApiFeatures } from "../../utils/api.features.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandling } from "../../utils/errorHandling.js";
import slugify from "slugify";

///////////
export const getAllCars = asyncHandling(async (req, res, next) => {
  const filter = {};
  if (req.params.id) {
    filter.categoryId = req.params.id;
  }

  const apiFeatures = new ApiFeatures(carModel.find(filter), req.query)
    .pagination()
    .filter()
    .search()
    .sort()
    .select();

  const cars = await apiFeatures.mongooseQuery;

  return res.status(200).json({ message: "Done", cars });
});

export const getCarById = getOne(carModel);

export const addNewCar = asyncHandling(async (req, res, next) => {
  const {
    name,
    color,
    modelYear,
    seater,
    powerHourse,
    categoryId,
    brandId,
    KilometersIncluded,
    rentalCost,
  } = req.body;
  let slug = slugify(name);


  const isExistCategory = await categoryModel.findById(categoryId)
  if(!isExistCategory) return next(new ErrorClass("Cannot Find This category "))
  const isExistBrand = await brandModel.findById(brandId)
  if(!isExistBrand) return next(new ErrorClass("Cannot Find This Brand "))

  const silderImagesPaths = [];
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.image[0].path,
    { folder: `RentACarTesting/Car/${slug}-${color}/mainIamge` }
  );

  for (let i = 0; i < req.files.images.length; i++) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.images[i].path,
      { folder: `RentACarTesting/Car/${slug}-${color}/silderImages` }
    );
    silderImagesPaths.push({ secure_url, public_id });
  }
  console.log(silderImagesPaths);
  const car = await carModel.create({
    name,
    slug,
    color,
    modelYear,
    seater,
    powerHourse,
    categoryId,
    brandId,
    KilometersIncluded,
    rentalCost,
    carSilderImages: silderImagesPaths,
    carCardImage: { secure_url, public_id },
  });
  return res.status(201).json({ message: "Done", car });
});

export const updateCarById = asyncHandling(async (req, res, next) => {
  const { id } = req.params;
  const isCarExist = await carModel.findById(id);
  if (!isCarExist) return next(new ErrorClass("Not Found", 404));
  if(req.body?.categoryId){
    const isExistCategory = await categoryModel.findById(categoryId)
    if(!isExistCategory) return next(new ErrorClass("Cannot Find This category "))
  }
  if(req.body?.brandIdId){
    const isExistBrand = await brandModel.findById(brandId)
    if(!isExistBrand) return next(new ErrorClass("Cannot Find This Brand "))
  }
   if(req.body?.name){
     req.body.slug = slugify(req.body.name);
   }
  if (req.files.image) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.image[0].path,
      { folder: `RentACarTesting/Car/${req.body.slug || isCarExist.slug }-${req.body.color || isCarExist.color}/mainIamge` }
    );

    if (isCarExist.carCardImage?.public_id) {
      await cloudinary.uploader.destroy(isCarExist.carCardImage.public_id);
    }
    req.body.carCardImage = { secure_url, public_id };
  }

  if (req.files.images) {
    const silderImagesPaths = [];
    for (let i = 0; i < req.files.images.length; i++) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.files.images[i].path,
        { folder: `RentACarTesting/Car/${req.body.slug || isCarExist.slug }-${req.body.color || isCarExist.color}/silderImages` }
      );
      silderImagesPaths.push({ secure_url, public_id });
    }
    if (isCarExist.carSilderImages) {
      for (let i = 0; i < isCarExist.carSilderImages.length; i++) {
        await cloudinary.uploader.destroy(isCarExist.carSilderImages.public_id);
      }
    }
    req.body.carSilderImages = silderImagesPaths;
  }

  const car = await carModel.findByIdAndUpdate(id,req.body,{new:true})

  return res.status(201).json({ message: "Done", car });
});
export const deleteCarById = deleteOne(carModel);





export const orderByDate = asyncHandling(async (req, res, next) => {
  const result = await carModel.find().sort({ createdAt: 1 });
  return res.status(200).json({ message: "done", result });
});
export const orderByPrice = asyncHandling(async (req, res, next) => {
  const result = await carModel.find().sort({ rentalCost: 1 });
  return res.status(200).json({ message: "done", result });
});
export const orderByPriceDesc = asyncHandling(async (req, res, next) => {
  const result = await carModel.find().sort({ rentalCost: -1 });
  return res.status(200).json({ message: "done", result });
});
