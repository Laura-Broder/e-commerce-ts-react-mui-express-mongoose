import { RequestHandler } from 'express';
import config from '../config';

export const getRootTest: RequestHandler = (req, res) => {
  res.status(200).json({
    name: config.name,
    description: config.description,
    version: config.version,
  });
};

export const postRootTest: RequestHandler = (req, res) => {
  const json = req.body;
  res.json(json);
};
