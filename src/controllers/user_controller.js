import { UserService } from "../services/index.js";
import ErrorResponse from "../utils/common/error_response.js";
import SuccessResponse from "../utils/common/success_response.js";

const createUser = async (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    name: req.body.name,
  };
  try {
    const response = await UserService.createUser(userData);
    res.status(201).json(new SuccessResponse(response));
  } catch (error) {
    console.error("Error creating user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const signInUser = async (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const response = await UserService.signInUser(userData);
    res.status(200).json(new SuccessResponse(response));
  } catch (error) {
    console.error("Error signing in user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search;

    // If search query is provided, filter users by username or name and $options is for case-insensitive search
    // If no search query is provided, return all users
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ],
      };
    }

    const userData = await UserService.getAllUsers(searchQuery);
    res.status(200).json(new SuccessResponse(userData));
  } catch (error) {
    console.error("Error getting all users controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getCurrentUser = async (req, res) => {
  const user = req.user.id;
  try {
    const userData = await UserService.getCurrentUser(user);
    res.status(200).json(new SuccessResponse(userData));
  } catch (error) {
    console.error("Error getting current user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await UserService.getUserById(userId);
    res.status(200).json(new SuccessResponse(userData));
  } catch (error) {
    console.error("Error getting user by id controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return res
      .status(403)
      .json(new ErrorResponse("You are not authorized to update this user"));
  }

  const allowedFields = ["name", "bio"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  try {
    const updatedUser = await UserService.updateUser(userId, updates);
    res.status(200).json(new SuccessResponse(updatedUser));
  } catch (error) {
    console.error("Error updating user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (req.user.id !== userId) {
    return res
      .status(403)
      .json(new ErrorResponse("You are not authorized to delete this user"));
  }

  try {
    const deletedUser = await UserService.deleteUser(userId);
    res.status(200).json(new SuccessResponse(deletedUser));
  } catch (error) {
    console.error("Error deleting user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

export const UserController = {
  createUser,
  signInUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  deleteUser,
};
