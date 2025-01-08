import mongoose, { get } from "mongoose";
import { getMongoConnectionString } from '../../config/envConfig';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(getMongoConnectionString());
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};