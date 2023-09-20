import { ErrorClass } from "./ErrorClass.js";
import cloudinary from "./cloudinary.js";
import { asyncHandling } from "./errorHandling.js";

export const deleteOne = (model) => {
  return asyncHandling(async (req, res, next) => {
    const { id } = req.params;
    const category = await model.findByIdAndDelete(id);
    if (!category) {
      return next(new ErrorClass("This Document Not exists", 404));
    }
    if(category.image.public_id){
      await cloudinary.uploader.destroy(category.image.public_id)
    }
    return res.status(200).json({ message: "Deleted" });
  });
};
export const getOne = (model) => {
  return asyncHandling(async (req, res, next) => {
    const { id } = req.params;
    const category = await model.findById(id);
    if (!category) {
      return next(new ErrorClass("This Document Not exists", 404));
    }
    return res.status(200).json({ message: "Deleted" });
  });
};
