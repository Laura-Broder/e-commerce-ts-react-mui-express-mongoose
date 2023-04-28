import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';
import { auth, validateEmailPassword } from '../middleware/userValidator';

const userRouter = express.Router();

userRouter.post("/login", validateEmailPassword, loginUser);
userRouter.post("/register", validateEmailPassword, registerUser);

export default userRouter;
