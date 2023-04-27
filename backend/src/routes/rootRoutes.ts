import express from "express";
import { getRoot, postRoot } from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", getRoot);
rootRouter.post("/", postRoot);

export default rootRouter;
