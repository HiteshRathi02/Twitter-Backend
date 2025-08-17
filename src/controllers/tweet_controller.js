import { TweetService } from "../services/index.js";
import ErrorResponse from "../utils/common/error_response.js";
import SuccessResponse from "../utils/common/success_response.js";

const createTweet = async (req, res) => {
  const tweetData = {
    author: req.user.id,
    content: req.body.content,
    media: req.body.media,
  };
  try {
    const response = await TweetService.createTweet(tweetData);
    res.status(201).json(new SuccessResponse(response));
  } catch (error) {
    console.error("Error creating tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getTweetById = async (req, res) => {
  const tweetId = req.params.id;
  try {
    const tweetData = await TweetService.getTweetById(tweetId);
    res.status(200).json(new SuccessResponse(tweetData));
  } catch (error) {
    console.error("Error getting tweet by ID controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getAllTweets = async (req, res) => {
  try {
    const tweetData = await TweetService.getAllTweets();
    res.status(200).json(new SuccessResponse(tweetData));
  } catch (error) {
    console.error("Error getting all tweets controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const deleteTweet = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try {
    const deletedTweet = await TweetService.deleteTweet(tweetId, userId);
    res.status(200).json(new SuccessResponse(deletedTweet));
  } catch (error) {
    console.error("Error deleting tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const updateTweet = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;
  const content = req.body.content;
  const media = req.body.media;

  try {
    const updatedTweet = await TweetService.updateTweet(
      tweetId,
      userId,
      content,
      media
    );
    res.status(200).json(new SuccessResponse(updatedTweet));
  } catch (error) {
    console.error("Error updating tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const replyToTweet = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;
  const content = req.body.content;
  const media = req.body.media;

  const replyData = {
    author: userId,
    content: content,
    media: media,
  }

  try {
    const replyTweet = await TweetService.replyToTweet(tweetId, replyData);
    res.status(201).json(new SuccessResponse(replyTweet));
  } catch (error) {
    console.error("Error replying to tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getAllReplies = async (req, res) => {
  const tweetId = req.params.id;

  try {
    const replies = await TweetService.getAllReplies(tweetId);
    res.status(200).json(new SuccessResponse(replies));
  } catch (error) {
    console.error("Error getting all replies controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const getTweetsByUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const tweets = await TweetService.getTweetsByUser(userId);
    res.status(200).json(new SuccessResponse(tweets));
  } catch (error) {
    console.error("Error getting tweets by user controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};

const searchTweetsByHashtag = async (req, res) => {
  const hashtag = req.params.hashtag;

  try {
    const tweets = await TweetService.searchTweetsByHashtag(hashtag);
    res.status(200).json(new SuccessResponse(tweets));
  } catch (error) {
    console.error("Error searching tweets by hashtag controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message));
  }
};  

const likeTweet = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try{
    const likedTweet = await TweetService.likeTweet(tweetId, userId);
    res.status(200).json(new SuccessResponse(likedTweet));
  }catch(error){
    console.error("Error liking tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message)); 
  }
};

const unlikeTweet = async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user.id;

  try{
    const unlikedTweet = await TweetService.unlikeTweet(tweetId, userId);
    res.status(200).json(new SuccessResponse(unlikedTweet));
  }catch(error){
    console.error("Error unliking tweet controller:", error.message);
    res.status(error.statusCode || 500).json(new ErrorResponse(error.message)); 
  }
};

export const TweetController = {
  createTweet,
  getTweetById,
  getAllTweets,
  deleteTweet,
  updateTweet,
  replyToTweet,
  getAllReplies,
  getTweetsByUser,
  searchTweetsByHashtag,
  likeTweet,
  unlikeTweet
};
