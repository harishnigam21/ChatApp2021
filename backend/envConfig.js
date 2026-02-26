import { configDotenv } from "dotenv";
configDotenv();

export const envList = {
  PORT: process.env.PORT,
  SECURE: process.env.SECURE,
  BACKEND_HOST: process.env.BACKEND_HOST,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  DB_STRING: process.env.DB_STRING,
  MAX_IMAGE_SIZE: process.env.MAX_IMAGE_SIZE,
  IMAGE_FORMAT_ALLOWED: process.env.IMAGE_FORMAT_ALLOWED,
  MAX_VIDEO_SIZE: process.env.MAX_VIDEO_SIZE,
  VIDEO_FORMAT_ALLOWED: process.env.VIDEO_FORMAT_ALLOWED,
};
