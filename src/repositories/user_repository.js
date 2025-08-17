import CRUD_Repository from "./CRUD_Repository.js";
import { User } from "../models/index.js";
import AppError from "../utils/errors/app_error.js";

class UserRepository extends CRUD_Repository {
  constructor() {
    super(User);
  }

  async getAll(query = {}) {
    try{
      let response = await this.model.find(query).select("-password");
      return response;
    } catch (err) {
      console.error("Error getting all users:", err);
      throw new AppError("Error retrieving users", 500);
    }
  }

  async getById(id) {
    try {
      let response = await this.model.findById(id).select("-password");
      return response;
    } catch (err) {
      console.error("Error getting user by ID:", err);
      throw new AppError("Error retrieving user by ID", 500);
    }
  }

  async getByUsername(username) {
    try {
      let response = await this.model.findOne({ username: username });
      return response;
    } catch (err) {
      console.error("Error getting user by username:", err);
      throw new AppError("Error retrieving user by username", 500);
    }
  }

  async getByEmail(email) {
    try {
      let response = await this.model.findOne({ email: email });
      return response;
    } catch (err) {
      console.error("Error getting user by email:", err);
      throw new AppError("Error retrieving user by email", 500);
    }
  }
}

export default UserRepository;
