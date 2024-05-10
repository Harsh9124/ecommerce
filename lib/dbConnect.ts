import mongoose from "mongoose";

const dbConnect = async () => {
  console.log("connecting to db");
  try {
    console.log("connecting to db");
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    throw new Error("connection failed");
  }
};

export default dbConnect;
