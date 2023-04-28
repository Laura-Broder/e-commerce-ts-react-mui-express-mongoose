import express from 'express';
import { getRootTest, postRootTest } from '../controllers/rootController';

const rootRouter = express.Router();

rootRouter.get("/test", getRootTest);
rootRouter.post("/test", postRootTest);

export default rootRouter;
