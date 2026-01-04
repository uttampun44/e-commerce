import mongoose from "mongoose";
import { configEnv } from "@/config/env";

const connectDB =  async () => {
  try {
    await mongoose.connect(configEnv.mongoURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;