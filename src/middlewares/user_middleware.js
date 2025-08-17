import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import ErrorResponse from "../utils/common/error_response.js";

const validateUserSignUpRequest = (req, res, next) => {
  const { username, email, password, bio, name } = req.body;

  if (!username || !email || !password || !bio || !name) {
    return res
      .status(400)
      .json(new ErrorResponse("Please provide all the fields"));
  }
  next();
};

const validateUserSignInRequest = (req, res, next) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res
      .status(400)
      .json(new ErrorResponse("Please provide username/email and password"));
  }
  next();
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json(new ErrorResponse("Please provide a valid token"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ErrorResponse("Invalid token or token expired"));
  }
};

export const userMiddleware = {
  validateUserSignUpRequest,
  authMiddleware,
  validateUserSignInRequest,
};
