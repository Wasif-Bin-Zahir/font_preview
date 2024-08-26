import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if already connected to avoid unnecessary connections
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI !, { });
      console.log("Database connected successfully");
    } else {
      console.log("Database connection already established");
    }
  } catch (error:any) {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit process with failure code if DB connection fails
  }
};

export default connectDB;
