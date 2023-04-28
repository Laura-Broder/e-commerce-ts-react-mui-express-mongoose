import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Result } from 'express-validator';
import { AppError, HttpCode } from '../types/AppError';

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

export function parseMongoError(error: Error) {
  let status = 500;
  let message = "Internal server error";

  switch (error.name) {
    case "ValidationError":
      status = 400;
      message = "Validation error";
      break;
    case "CastError":
      status = 400;
      message = "Invalid request parameter";
      break;
    case "MongoServerError":
      if ((error as any).code === 11000) {
        status = 409;
        message = "Duplicate key error";
      }
      break;
    default:
      break;
  }

  return new AppError({
    httpCode: status,
    description: message,
  });
}
