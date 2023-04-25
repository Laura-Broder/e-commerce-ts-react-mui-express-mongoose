import { ErrorRequestHandler, RequestHandler } from "express";
import config from "../config";

/**
 * 500 response & log when errors are raised.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  return res.status(500).json({
    message: config.nodeEnv === "production" ? "unknown error" : `${err}`,
  });
};

/**
 * JSON 404 response
 */
export const fourOhFour: RequestHandler = (req, res) => {
  return res.status(404).json({ message: "not found" });
};
