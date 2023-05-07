import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
// import { getPlantsList, mapResData } from "../services/axiosService";
import mockData from "../db/mockData.json";
import { getPlantDetails } from "../services/axiosService";
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
      // const searchRes = await getPlantsList(params);
      // if (searchRes?.data) {
      //   res.status(200).json(mapResData(searchRes.data));
      // }
      res.status(200).json(mockData);
    } catch (error) {
      next(error);
    }
  }
};

export const getProduct: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("file: productsController.ts:38 ~ req:", req.params);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("file: productsController.ts:46 ~ errors:", errors.array());

    next(
      new AppError({
        httpCode: HttpCode.UNPROCESSABLE_CONTENT,
        description: "Invalid query params",
        errors: errors.formatWith((e) => e.msg).array(),
      })
    );
  } else {
    try {
      const { id } = req.params as unknown as {
        id: string | number;
      };
      const searchRes = await getPlantDetails(id);
      // console.log(
      //   "file: productsController.ts:47 ~ searchRes:",
      //   searchRes.data
      // );
      res.status(200).json({
        data: searchRes.data,
      });
    } catch (error) {
      // console.log("file: productsController.ts:53 ~ error:", error);
    }
  }
};
