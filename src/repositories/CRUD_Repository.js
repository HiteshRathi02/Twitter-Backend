import AppError from "../utils/errors/app_error.js";

class CRUD_Repository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      let response = await this.model.create(data);
      return response;
    } catch (err) {
      console.error("Error creating document:", err);
      throw err;
    }
  }

  async getAll() {
    try {
      let response = await this.model.find();
      return response;
    } catch (err) {
      console.error("Error getting all documents:", err);
      throw err;
    }
  }

  async getById(id) {
    try {
      let response = await this.model.findById(id);
      if (!response) {
        throw new AppError("Document not found", 404);
      }
      return response;
    } catch (err) {
      console.error("Error getting document by ID:", err);
      throw err;
    }
  }

  async deleteById(id) {
    try {
      let response = await this.model.findByIdAndDelete(id);
      if (!response) {
        throw new AppError("Document not found", 404);
      }
      return response;
    } catch (err) {
      console.error("Error deleting document by ID:", err);
      throw err;
    }
  }

  async update(id, updates){
    try{
      let response = await this.model.findByIdAndUpdate(id, updates, { new: true , runValidators: true });
      if(!response){
        throw new AppError("Document not found", 404);
      }
      return response;
    }
    catch(err){
      console.error("Error updating document by ID:", err);
      throw err;
    }
  }
}

export default CRUD_Repository;