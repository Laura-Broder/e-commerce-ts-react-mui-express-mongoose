import { NextFunction, Request, RequestHandler, Response } from 'express';
import { validationResult } from 'express-validator';
import { parseMongoError } from '../middleware/errorHandler';
import * as userServices from '../services/userServices';
import { AppError, HttpCode } from '../types/AppError';

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      new AppError({
        httpCode: HttpCode.UNPROCESSABLE_CONTENT,
        description: "Invalid input",
        errors: errors.formatWith((e) => e.msg).array(),
      })
    );
  } else {
    try {
      const foundUser = await userServices.login(req.body);
      res.status(200).send(foundUser);
    } catch (error) {
      return next(error);
    }
  }
};

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      new AppError({
        httpCode: HttpCode.UNPROCESSABLE_CONTENT,
        description: "Failed to register a new user",
        errors: errors.formatWith((e) => e.msg).array(),
      })
    );
  } else {
    try {
      const newUser = await userServices.register(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      if (error instanceof Error) {
        next(parseMongoError(error));
      } else {
        next(
          new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: "Failed to register a new user",
          })
        );
      }
    }
  }
};
