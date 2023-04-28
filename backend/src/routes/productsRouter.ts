import express from 'express';
import { getProduct, getProducts } from '../controllers/productsController';
import { validateParams, validateQuery } from '../middleware/searchValidator';

const productsRouter = express.Router();

productsRouter.get("/", validateQuery, getProducts);
productsRouter.get("/:productId", validateParams, getProduct);

export default productsRouter;
