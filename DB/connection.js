import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(`mongodb+srv://aliiiabdallah98:SExvCZpJLIiCqiMY@cluster0.kwbzc20.mongodb.net/RentCarTesting`)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};

export default connectDB;

