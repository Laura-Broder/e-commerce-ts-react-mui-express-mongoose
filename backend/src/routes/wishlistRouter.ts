import express from "express";
import { auth } from "../middleware/userValidator";

const wishlistRouter = express.Router();

wishlistRouter.patch("/:id", auth);
wishlistRouter.delete("/:id", auth);

export default wishlistRouter;
