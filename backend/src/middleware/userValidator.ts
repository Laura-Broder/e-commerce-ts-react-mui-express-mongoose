import { check } from "express-validator";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import { AppError, HttpCode } from "../types/AppError";

export const validateEmailPassword = [
  check("email", "Email Must Be a Valid Email Address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
];

export const SECRET_KEY: Secret = config.jwt.secret;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Please authenticate",
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: "Please authenticate",
    });
  }
};
