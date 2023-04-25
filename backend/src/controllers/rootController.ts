import { RequestHandler } from "express";
import config from "../config";

export const getRoot: RequestHandler = (req, res) => {
  res.status(200).json({
    name: config.name,
    description: config.description,
    version: config.version,
  });
};

export const postRoot: RequestHandler = (req, res) => {
  const json = req.body;
  res.json(json);
};
