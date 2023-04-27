import express from "express";
import { auth, validateEmailPassword } from "../middleware/userValidator";
import { loginUser, registerUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", validateEmailPassword, loginUser);
userRouter.post("/register", validateEmailPassword, registerUser);
userRouter.patch("/wishlist/:productId", auth, registerUser);
userRouter.delete("/wishlist/:productId", auth, registerUser);
userRouter.patch("/cart/:productId", auth, registerUser);
userRouter.delete("/cart/:productId", auth, registerUser);

export default userRouter;
