import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL_ATLAS)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};

export default connectDB;
