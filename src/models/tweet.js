import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",         
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280       
    },
    media: [
      {
        url: { type: String },
        type: { type: String, enum: ["image", "video"] }
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"        
      }
    ]
  },
  { timestamps: true }      
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
