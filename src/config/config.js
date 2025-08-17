import dotenv from "dotenv";
dotenv.config();

export const { MONGODB_URI, PORT, JWT_SECRET, JWT_EXPIRATION } = process.env;