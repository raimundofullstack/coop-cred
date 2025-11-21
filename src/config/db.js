import mongoose from "mongoose";
import logger from "../config/logger.js";

export async function connectDb() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);

    logger.info(`✅ Connected to MongoDB`);
  } catch (error) {
    logger.error("❌ Error connecting to MongoDB:", error);
  }
}
