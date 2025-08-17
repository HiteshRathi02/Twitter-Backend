import CRUD_Repository from "./CRUD_Repository.js";
import { Tweet } from "../models/index.js";
import AppError from "../utils/errors/app_error.js";

class TweetRepository extends CRUD_Repository {
  constructor() {
    super(Tweet);
  }

  async getTweetById(tweetId) {
    try {
      let response = await this.model
        .findById(tweetId)
        .populate("author", "username name")

        if(!response){
          throw new AppError("Tweet not found", 404);
        }

      return response;

    } catch (err) {
      console.error("Error getting tweet by ID repo layer:", err);
      throw new AppError("Error retrieving tweet by ID", 500);
    }
  }

  async getAllTweets(){
    try{
      let response = await this.model.find().sort({createdAt: -1}).populate("author", "username name");
      return response;
    }
    catch(err){

      console.error("Error getting all tweets repo layer:", err);
      throw new AppError("Error retrieving all tweets", 500);
    }
  }

  async getTweetsByUser(userId){
    try{
      let response = await this.model.find({author: userId}).sort({createdAt: -1}).populate("author", "username name");
      return response;
    }
    catch(err){
      console.error("Error getting tweets by user repo layer:", err);
      throw new AppError("Error retrieving tweets by user", 500);
    }
  }

  async getTweetsByIds(tweetIds){
    try{
      let response = await this.model.find({_id: {$in: tweetIds}}).populate("author", "username name");
      return response; 
    }
    catch(err){
      console.error("Error getting tweets by ids repo layer:", err);
      throw new AppError("Error retrieving tweets by ids", 500);
    }
  }
}

export default TweetRepository;
