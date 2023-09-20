import carModel from "../../../DB/Models/Car.model.js";
import { ApiFeatures } from "../../utils/api.features.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandling } from "../../utils/errorHandling.js";
import slugify from "slugify";

///////////
export const getAllCars = asyncHandling(async (req, res, next) => {

  const filter = {}
  if (req.params.id){
    filter.categoryId =req.params.id
  }

  const apiFeatures = new ApiFeatures(carModel.find(filter),req.query).pagination().filter().search().sort().select()

  const cars = await apiFeatures.mongooseQuery



  return res.status(200).json({ message: "Done", cars });
});

export const addNewCar = asyncHandling(async (req, res, next) => {
  const {
    name,
    color,
    modelYear,
    seater,
    powerHourse,
    category,
    brand,
    KilometersIncluded,
    rentalCost,
  } = req.body;
  const slug = slugify(name);
  const mainImagePath = req.files.image[0].path;
  // console.log({ name, slug,color,modelYear,seater,powerHourse,category,brand,KilometersIncluded,rentalCost });

  const silderImagesPaths = [];

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    mainImagePath,
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
    category,
    brand,
    KilometersIncluded,
    rentalCost,
    carSilderImages: silderImagesPaths,
    carCardImage: { secure_url, public_id },
  });
  return res.status(201).json({ message: "Done", car });
});

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
