import express from "express";
import { UserController } from "../../controllers/index.js";
import { userMiddleware } from "../../middlewares/index.js";

const router = express.Router();

router.post("/signup", userMiddleware.validateUserSignUpRequest, UserController.createUser);

router.post("/signin",userMiddleware.validateUserSignInRequest, UserController.signInUser);

router.get("/", UserController.getAllUsers);

router.get("/me", userMiddleware.authMiddleware, UserController.getCurrentUser); 

router.get("/:id", UserController.getUserById);

router.patch("/:id", userMiddleware.authMiddleware, UserController.updateUser);

router.delete("/:id", userMiddleware.authMiddleware, UserController.deleteUser);

export default router;