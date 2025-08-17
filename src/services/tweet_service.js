import { TweetRepository, HashtagRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app_error.js";

const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();

const createTweet = async (tweet) => {
  try {
    const tweetData = await tweetRepository.create(tweet);

    const hashtags = tweet.content.match(/#\w+/g) || [];
    for (const tag of hashtags) {
      const hashtagText = tag.replace("#", "").toLowerCase();
      let hashtagDoc = await hashtagRepository.getByName(hashtagText);

      if (!hashtagDoc) {
        hashtagDoc = await hashtagRepository.create({
          text: hashtagText,
          tweets: [tweetData._id],
        });
      } else {
        hashtagDoc = await hashtagRepository.addTweetToHashtag(
          hashtagDoc,
          tweetData._id
        );
      }
    }
    return tweetData;
  } catch (err) {
    console.error("Error creating tweet:", err);
    console.log(err.name);

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

const getTweetById = async (tweetId) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);
    return tweetData;
  } catch (err) {
    console.error("Error getting tweet by ID:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const getAllTweets = async () => {
  try {
    const tweetData = await tweetRepository.getAllTweets();
    return tweetData;
  } catch (err) {
    console.error("Error getting all tweets:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const deleteTweet = async (tweetId, userId) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);

    if (!tweetData) {
      throw new AppError("Tweet not found", 404);
    }

    if (tweetData.author.id !== userId) {
      throw new AppError("You are not authorized to delete this tweet", 403);
    }

    await tweetRepository.model.updateOne(
      { replies: tweetId },
      { $pull: { replies: tweetId } }
    );

    await hashtagRepository.removeTweetFromHashtag(tweetId);
    const deletedTweet = await tweetRepository.deleteById(tweetId);
    return deletedTweet;
  } catch (err) {
    console.error("Error deleting tweet:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const updateTweet = async (tweetId, userId, content, media) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);

    if (!tweetData) {
      throw new AppError("Tweet not found", 404);
    }

    if (tweetData.author.id !== userId) {
      throw new AppError("You are not authorized to update this tweet", 403);
    }

    const oldHashtags = tweetData.content.match(/#[a-zA-Z0-9_]+/g) || [];
    const newHashtags = content?.match(/#[a-zA-Z0-9_]+/g) || [];

    tweetData.content = content ?? tweetData.content;
    tweetData.media = media ?? tweetData.media;

    const updatedTweet = await tweetData.save();

    // console.log("old hashtag", oldHashtags);
    // console.log("new hashtag", newHashtags);

    const hashtagsToAdd = newHashtags.filter((ht) => !oldHashtags.includes(ht));
    const hashtagsToRemove = oldHashtags.filter(
      (ht) => !newHashtags.includes(ht)
    );

    // console.log("hashtagsToAdd", hashtagsToAdd);
    // console.log("hashtagsToRemove", hashtagsToRemove);

    for (let tag of hashtagsToAdd) {
      let lowerTag = tag.replace("#", "").toLowerCase();
      let hashtagDoc = await hashtagRepository.getByName(lowerTag);
      if (!hashtagDoc) {
        hashtagDoc = await hashtagRepository.create({
          text: lowerTag,
          tweets: [tweetData._id],
        });
      } else {
        await hashtagRepository.addTweetToHashtag(hashtagDoc, tweetData._id);
      }
    }

    if (hashtagsToRemove.length > 0) {
      await hashtagRepository.removeTweetFromHashtag(tweetData._id);
    }

    return updatedTweet;
  } catch (err) {
    console.error("Error updating tweet:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const replyToTweet = async (parentTweetId, replyData) => {
  try {
    const parentTweet = await tweetRepository.getTweetById(parentTweetId);

    if (!parentTweet) {
      throw new AppError("Parent tweet not found", 404);
    }

    const replytweet = await tweetRepository.create(replyData);

    parentTweet.replies.push(replytweet._id);
    await parentTweet.save();
    return replytweet;
  } catch (err) {
    console.error("Error replying to tweet:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const getAllReplies = async (tweetId) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);

    if (!tweetData) {
      throw new AppError("Tweet not found", 404);
    }

    const populateTweet = await tweetData.populate("replies");
    return populateTweet.replies;
  } catch (err) {
    console.error("Error getting all replies:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const getTweetsByUser = async (userId) => {
  try {
    const tweetData = await tweetRepository.getTweetsByUser(userId);

    if (!tweetData) {
      throw new AppError("No tweets found for this user", 404);
    }

    return tweetData;
  } catch (err) {
    console.error("Error getting tweets by user:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const searchTweetsByHashtag = async (hashtag) => {
  try {
    const cleanedHashtag = hashtag.replace("#", "");
    const hashtagDoc = await hashtagRepository.getByName(cleanedHashtag);

    if (!hashtagDoc) {
      throw new AppError("Hashtag not found", 404);
    }

    const tweets = await tweetRepository.getTweetsByIds(hashtagDoc.tweets);
    return tweets;
  } catch (err) {
    console.error("Error searching tweets by hashtag:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const likeTweet = async (tweetId, userId) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);

    if (!tweetData) {
      throw new AppError("Tweet not found", 404);
    }

    if (tweetData.likes.includes(userId)) {
      throw new AppError("You have already liked this tweet", 400);
    }

    tweetData.likes.push(userId);
    const updatedTweet = await tweetData.save();
    return updatedTweet;
  } catch (err) {
    console.error("Error liking tweet:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

const unlikeTweet = async (tweetId, userId) => {
  try {
    const tweetData = await tweetRepository.getTweetById(tweetId);

    if (!tweetData) {
      throw new AppError("Tweet not found", 404);
    }

    if (!tweetData.likes.includes(userId)) {
      throw new AppError("You have not liked this tweet", 400);
    }

    tweetData.likes = tweetData.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    const updatedTweet = await tweetData.save();
    return updatedTweet;
  } catch (err) {
    console.error("Error unliking tweet:", err);
    throw new AppError(err.message, err.statusCode || 500);
  }
};

export const TweetService = {
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
  unlikeTweet,
};
