import { UserRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app_error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/common/jwt.js";

const userRepository = new UserRepository();

const saltRounds = 10;

const createUser = async (user) => {
  try {
    const emailExists = await userRepository.getByEmail(user.email);
    if (emailExists) {
      throw new AppError("Email already exists", 400);
    }

    const usernameExists = await userRepository.getByUsername(user.username);
    if (usernameExists) {
      throw new AppError("Username already exists", 400);
    }

    user.password = await bcrypt.hash(user.password, saltRounds);

    const response = await userRepository.create(user);
    return response;

  } 
  catch (err) {
    if (err.name === "ValidationError") {
      const explanation = [];
      for (const field in err.errors) {
        explanation.push(err.errors[field].message);
      }
      throw new AppError(explanation, 400);
    }

    throw new AppError(err.message, err.statusCode || 500);
  }
};

const signInUser = async (user) => {
  try {
    let userData;

    if (user.username) {
      userData = await userRepository.getByUsername(user.username);
    } else if (user.email) {
      userData = await userRepository.getByEmail(user.email);
    } else {
      throw new AppError("Please provide either username or email", 400);
    }

    if (!userData) {
      throw new AppError("User not found", 404);
    }

    
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userData.password
    );
  

    if (!isPasswordCorrect) {
      throw new AppError("Incorrect password", 400);
    }

    const token = generateToken(userData);

    return {
      user: {
        id: userData._id,
        username: userData.username,
        email: userData.email,
      },
      token,
      message: "User signed in successfully",
    };
  } catch (err) {
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const getAllUsers = async (query) => {
  try {
    const userData = await userRepository.getAll(query);
    return userData;
  } catch (err) {
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const getCurrentUser = async (user) =>{
  try{
    const userData = await userRepository.getById(user);

    if(!userData){
      throw new AppError("User not found", 404);
    }
    return userData;
  }
  catch (err) {
    throw new AppError(err.message, err.statusCode || 500); 
  }
}

const getUserById = async (userId) => {
  try {
    const userData = await userRepository.getById(userId);
    return userData;
  } catch (err) {
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const updateUser = async (userId, updates) => {
  try {
    const updatedUser= await userRepository.update(userId, updates);
    return updatedUser;
  } catch (err) { 
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const deleteUser = async (userId) =>{
  try{
    const deletedUser = await userRepository.deleteById(userId);
    return deletedUser;
  }
  catch(err){
    throw new AppError(err.message, err.statusCode || 500);
  }
}
export const UserService = {
  createUser,
  signInUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
};
