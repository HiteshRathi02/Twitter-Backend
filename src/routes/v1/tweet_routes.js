import express from "express";
import { tweetMiddleware, userMiddleware } from "../../middlewares/index.js";
import { TweetController } from "../../controllers/index.js";

const router = express.Router();

router.post(
  "/",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateTweetCreateRequest,
  TweetController.createTweet
);

router.get("/", TweetController.getAllTweets);

router.get(
  "/:id",
  tweetMiddleware.validateObjectId,
  TweetController.getTweetById
);

router.delete(
  "/:id",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateObjectId,
  TweetController.deleteTweet
);

router.patch(
  "/:id",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateObjectId,
  TweetController.updateTweet
);

router.post(
  "/:id/replies",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateObjectId,
  tweetMiddleware.validateTweetCreateRequest,
  TweetController.replyToTweet
);

router.get(
  "/:id/replies",
  tweetMiddleware.validateObjectId,
  TweetController.getAllReplies
);

router.get(
  "/user/:id",
  tweetMiddleware.validateObjectId,
  TweetController.getTweetsByUser
);


router.get("/search/:hashtag", TweetController.searchTweetsByHashtag);

router.post("/:id/like",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateObjectId,
  TweetController.likeTweet
);

router.post("/:id/unlike",
  userMiddleware.authMiddleware,
  tweetMiddleware.validateObjectId,
  TweetController.unlikeTweet
);

export default router;
