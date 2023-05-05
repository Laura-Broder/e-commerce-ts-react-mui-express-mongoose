import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import config from "../config";
import { getPlantsList, mapResData } from "../services/axiosService";
import { IPlantListQueryParams } from "../types/ApiData";
import { AppError, HttpCode } from "../types/AppError";

export const getProducts: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      new AppError({
        httpCode: HttpCode.UNPROCESSABLE_CONTENT,
        description: "Invalid query params",
        errors: errors.formatWith((e) => e.msg).array(),
      })
    );
  } else {
    const params = req.query as unknown as IPlantListQueryParams;
    try {
      const searchRes = await getPlantsList(params);
      if (searchRes?.data) {
        res.status(200).json(mapResData(searchRes.data));
      }
    } catch (error) {
      next(error);
    }
  }
};

export const getProduct: RequestHandler = (req, res) => {
  console.log("file: productsController.ts:15 ~ req:", req);
  res.status(200).json({
    name: config.name,
    description: config.description,
    version: config.version,
  });
};
