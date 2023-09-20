import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/RentCarTesting`)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};

export default connectDB;
