import { checkSchema } from "express-validator";
import {
  cycleOptions,
  hardnessOptions,
  sunlightOptions,
  wateringOptions,
} from "../types/ApiData";

export const validateQuery = checkSchema(
  {
    q: { notEmpty: true },
    page: { optional: true, isNumeric: true },
    edible: { optional: true, isBoolean: true },
    poisonous: { optional: true, isBoolean: true },
    cycle: { optional: true, isIn: { options: [cycleOptions] } },
    watering: { optional: true, isIn: { options: [wateringOptions] } },
    sunlight: { optional: true, isIn: { options: [sunlightOptions] } },
    indoor: { optional: true, isBoolean: true },
    hardiness: { optional: true, isIn: { options: [hardnessOptions] } },
  },
  ["query"]
);

export const validateParams = checkSchema(
  {
    productId: { isNumeric: true },
  },
  ["params"]
);
