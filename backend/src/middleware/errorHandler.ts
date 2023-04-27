import { ErrorRequestHandler, RequestHandler } from "express";
import config from "../config";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * 500 response & log when errors are raised.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const e = getErrorMessage(err);
  console.error(e);
  return res.status(500).json({
    message: config.nodeEnv === "production" ? "unknown error" : `${e}`,
  });
};

/**
 * JSON 404 response
 */
export const routeNotFound: RequestHandler = (req, res) => {
  return res.status(404).json({ message: "not found" });
};
