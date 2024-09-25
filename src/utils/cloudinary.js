import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dstz0wiuz",
  api_key: "232534976191712",
  api_secret: "BdoWaduP1hGly_Ruvm2S9Ae4h5Y",
});

export default cloudinary;
