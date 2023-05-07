import express from "express";
import { auth } from "../middleware/userValidator";

const cartRouter = express.Router();

cartRouter.patch("/:id", auth);
cartRouter.delete("/:id", auth);

export default cartRouter;
