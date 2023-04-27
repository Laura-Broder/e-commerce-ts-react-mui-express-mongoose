import express from "express";
import { auth } from "../middleware/userValidator";
const cartRouter = express.Router();

cartRouter.patch("/:productId", auth);
cartRouter.delete("/:productId", auth);

export default cartRouter;
