import { ErrorClass } from "./ErrorClass.js";

 export const asyncHandling = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(new ErrorClass(err.message, err.status || 500));
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  return res.status(error.status || 400).json({ ErrMessage: error.message, stack: error.stack
   });
};
