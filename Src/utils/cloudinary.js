import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();
console.log({ k: process.env.CLOUD_NAME ,kk:process.env.API_KEY});

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.API_KEY,
  // api_secret: process.env.API_SECRET,
  cloud_name: 'dgwaqs0i8', 
  api_key: '172181411358383', 
  api_secret: 'SSc-DTufyIwZY-6Y8GRpjcmDhmo',
  secure: true,
});

export default cloudinary;
