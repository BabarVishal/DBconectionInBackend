import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use await to ensure the connection completes before proceeding
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
