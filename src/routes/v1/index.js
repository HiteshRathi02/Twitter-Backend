import express from "express";

import tweetRoutes from "./tweet_routes.js";
import userRoutes from "./user_routes.js";

const router = express.Router();

router.use("/tweets", tweetRoutes);
router.use("/users", userRoutes);

export default router;
