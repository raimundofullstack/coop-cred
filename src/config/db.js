import mongoose from "mongoose";
import logger from "../config/logger.js";

export async function connectDb() {
  try {
    const MONGO_URL = process.env.MONGO_URL;

    await mongoose.connect(MONGO_URL);

    logger.info(`✅ Connected to MongoDB`);
  } catch (error) {
    logger.error("❌ Error connecting to MongoDB:", error);
  }
}
