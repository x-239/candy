import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

let isConneced = false;

export const connectOrderDB = async () => {
  if (isConneced) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONG_URL is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConneced = true;
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
