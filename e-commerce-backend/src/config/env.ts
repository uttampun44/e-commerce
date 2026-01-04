import dotenv from "dotenv";

// Environment variables configuration
dotenv.config();


export const configEnv = {
  port: process.env.PORT || 8000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret_key",
  nodeEnv: process.env.NODE_ENV || "development",
};

console.log("Environment Variables Loaded:", configEnv);