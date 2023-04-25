import dotenv from "dotenv";
dotenv.config();
import packageJson from "../package.json";

type ConfigType = {
  version: string;
  name: string;
  description: string;
  nodeEnv: string;
  port: string | number;
  clientOrigins: {
    development: string;
    production: string;
  };
  secret: {
    apiKey: string;
  };
};

const config: ConfigType = {
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,

  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: process.env["PORT"] ?? 8080,

  clientOrigins: {
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },

  secret: {
    apiKey: process.env["TREFLEIO_API_KEY"] ?? "",
  },
};

export default config;
