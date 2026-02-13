import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not set - running without database. Set MONGO_URI in .env for full functionality.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.warn("MongoDB connection failed:", error.message);
    console.warn("Server will run with mock/empty data. Fix MONGO_URI or IP whitelist for live data.");
  }
};

export default connectDB;
