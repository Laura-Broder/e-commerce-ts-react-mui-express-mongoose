import dotenv from "dotenv";
dotenv.config();
import packageJson from "../package.json";

type ConfigType = {
  version: string;
  name: string;
  description: string;
  nodeEnv: string;
  port: string | number;
  mongoUri: string;
  clientOrigins: {
    development: string;
    production: string;
  };
  perenualApi: { baseUrl: string; apiKey: string };
  trefleApi: { baseUrl: string; apiKey: string };
  jwt: { secret: string };
};

const config: ConfigType = {
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,

  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: process.env["PORT"] ?? 8080,
  mongoUri:
    process.env["MONGO_URI"] ??
    "mongodb://127.0.0.1:27017/e-commerce-app?readPreference=primary&serverSelectionTimeoutMS=10000&retryWrites=true&directConnection=true&ssl=false",

  clientOrigins: {
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },
  perenualApi: {
    baseUrl: process.env["PERENUAL_URL"] ?? "https://perenual.com/api",
    apiKey: process.env["PERENUAL_API_KEY"] ?? "",
  },
  trefleApi: {
    baseUrl: process.env["TREFLE_URL"] ?? "https://trefle.io/api/v1",
    apiKey: process.env["TREFLEIO_API_KEY"] ?? "",
  },

  jwt: {
    secret: process.env["JWT_SECRET_KEY"] ?? "",
  },
};

export default config;
