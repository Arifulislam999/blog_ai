import mongoose from "mongoose";
let isConnected = false;
export const connectedDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connect.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "blog_with_ai",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("db is connect.");
  } catch (error) {
    console.log("db is connected Error.", error);
  }
};
