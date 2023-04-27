import axios from "axios";
import config from "../config";

const perenualApi = axios.create({
  baseURL: config.perenualApi.baseUrl,
  params: {
    key: config.perenualApi.apiKey,
  },
});

const trefleApi = axios.create({
  baseURL: config.trefleApi.baseUrl,
  params: {
    token: config.trefleApi.apiKey,
  },
});
