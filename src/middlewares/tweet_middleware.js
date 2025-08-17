import mongoose from "mongoose";
import ErrorResponse from "../utils/common/error_response.js";

const validateTweetCreateRequest = (req, res, next) => {
  const { content, media } = req.body;

  if (!content && (!media || media.length === 0)) {
    return res
      .status(400)
      .json(new ErrorResponse("Please provide content or media"));
  }

  if (
    media &&
    media.some((m) => {
      !["image", "video"].includes(m.type);
    })
  ) {
    return res
      .status(400)
      .json(new ErrorResponse("Media type must be 'image' or 'video"));
  }
  next();
};

const validateObjectId = (req,res,next)=>{
  const id = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json(new ErrorResponse("Invalid ObjectId"));
  }
  next();
}

export const tweetMiddleware = {
  validateTweetCreateRequest,
  validateObjectId
};
