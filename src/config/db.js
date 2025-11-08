import mongoose from "mongoose";

export async function connectDb() {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      (process.env.NODE_ENV === "production"
        ? "mongodb://mongo:27017/coopcred"
        : "mongodb://localhost:27017/coopcred");

    await mongoose.connect(MONGO_URI);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}
