import express from "express";
import { auth } from "../middleware/userValidator";
const wishlistRouter = express.Router();

wishlistRouter.patch("/:productId", auth);
wishlistRouter.delete("/:productId", auth);

export default wishlistRouter;
