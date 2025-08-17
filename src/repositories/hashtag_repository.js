import CRUD_Repository from "./CRUD_Repository.js";
import { Hashtag } from "../models/index.js";
import AppError from "../utils/errors/app_error.js";

class HashtagRepository extends CRUD_Repository {
  constructor() {
    super(Hashtag);
  }

  async getByName(name) {
    try {
      let response = await this.model.findOne({ text: name });
      return response;
    } catch (err) {
      console.error("Error getting hashtag by name:", err);
      throw new AppError("Error retrieving hashtag by name", 500);
    }
  }

  async addTweetToHashtag(hashtagDoc, tweetId) {
    try {
      if (!hashtagDoc.tweets.includes(tweetId)) {
        hashtagDoc.tweets.push(tweetId);
        let response = await hashtagDoc.save();
        return response;
      }
      return hashtagDoc;
    } catch (err) {
      console.error("Error adding tweet to hashtag:", err);
      throw new AppError("Error adding tweet to hashtag", 500);
    }
  }

  async removeTweetFromHashtag(tweetId) {
    try {
      let response = await this.model.updateMany(
        { tweets: tweetId },
        { $pull: { tweets: tweetId } }
      );
      return response;
    } catch (err) {
      console.error("Error removing tweet from hashtag:", err);
      throw new AppError("Error removing tweet from hashtag", 500);
    }
  }
}

export default HashtagRepository;
