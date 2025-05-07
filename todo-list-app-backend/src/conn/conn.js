import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MOGODB_URI = process.env.MOGODB_URI;

const conn = async (req, res) => {
  try {
    await mongoose.connect(MOGODB_URI).then(() => {
      console.log("Connected");
    });
  } catch (error) {
    console.log("Mongodb Connection Error, ", error);
  }
};
conn();
