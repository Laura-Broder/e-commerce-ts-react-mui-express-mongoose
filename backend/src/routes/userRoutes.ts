import express from "express";
import { validateEmailPassword } from "../middleware/userValidator";
import { loginUser, registerUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", validateEmailPassword, loginUser);
userRouter.post("/register", validateEmailPassword, registerUser);

export default userRouter;
