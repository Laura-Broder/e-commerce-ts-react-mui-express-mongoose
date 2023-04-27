import {
  ErrorRequestHandler,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import config from "../config";
import { AppError, HttpCode } from "../types/AppError";
import { Result } from "express-validator";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * JSON 404 response
 */
export const routeNotFound: RequestHandler = (req: Request, res: Response) => {
  return res.status(404).json({ message: "route not found" });
};

class ErrorHandler {
  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response
      .status(error.httpCode)
      .json({ message: error.message, errors: error.errors });
  }

  private handleUntrustedError(
    error: Error | AppError,
    response?: Response
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }

    console.log("Application encountered an untrusted error.");
    console.log(error);
  }
}

const handler = new ErrorHandler();
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handler.handleError(err, res);
};

export const getErrorMessageFromValidatorResults = (
  results: Result
): string => {
  return results
    .formatWith((error) => error.msg as string)
    .array()
    .join(", ");
};
