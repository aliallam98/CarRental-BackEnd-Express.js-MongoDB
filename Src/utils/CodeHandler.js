import { ErrorClass } from "./ErrorClass.js";
import cloudinary from "./cloudinary.js";
import { asyncHandling } from "./errorHandling.js";

export const deleteOne = (model) => {
  return asyncHandling(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ErrorClass("This Document Not exists", 404));
    }
    console.log(document);
    if(document.image?.public_id || document.carCardImage?.public_id){
      await cloudinary.uploader.destroy(document.image?.public_id || document.carCardImage?.public_id)
    }
    if(document.images?.public_id || document.carSilderImages?.public_id){
      for (let i = 0; i < document.images.length; i++) {
        await cloudinary.uploader.destroy(document.images[i].public_id || document.carCardImage[i]?.public_id)
        
      }
    }
    document.deleteOne()
    await document.save()
    return res.status(200).json({ message: "Deleted" });
  })
};
export const getOne = (model) => {
  return asyncHandling(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ErrorClass("This Document Not exists", 404));
    }
    return res.status(200).json({ message: "Deleted" });
  });
};
