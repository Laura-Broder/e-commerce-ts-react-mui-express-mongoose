import { RequestHandler } from 'express';
import config from '../config';

export const getProducts: RequestHandler = (req, res) => {
  console.log("file: productsController.ts:5 ~ req:", req.query);

  res.status(200).json({
    name: config.name,
    description: config.description,
    version: config.version,
  });
};

export const getProduct: RequestHandler = (req, res) => {
  console.log("file: productsController.ts:15 ~ req:", req);
  res.status(200).json({
    name: config.name,
    description: config.description,
    version: config.version,
  });
};
