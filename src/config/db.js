import mongoose from "mongoose";
import logger from "../config/logger.js";

export async function connectDb() {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      (process.env.NODE_ENV === "production"
        ? "mongodb://mongo:27017/coopcred"
        : "mongodb://localhost:27017/coopcred");

    await mongoose.connect(MONGO_URI);

    logger.info(`✅ Connected to MongoDB`);
  } catch (error) {
    logger.error("❌ Error connecting to MongoDB:", error);
  }
}
