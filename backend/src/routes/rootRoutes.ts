import express from "express";
import { getRoot, postRoot } from "../controllers/rootController";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);

export default root;
