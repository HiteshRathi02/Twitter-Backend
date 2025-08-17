import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../../config/index.js";

export const generateToken = (user)=>{
    return jwt.sign({id: user._id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    })
}
