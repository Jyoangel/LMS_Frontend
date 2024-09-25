import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://jyotigupta:guptajyoti@patraihome.uysh0nk.mongodb.net/patrai?retryWrites=true&w=majority&appName=patraihome",

    );
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(error);
  }
};
