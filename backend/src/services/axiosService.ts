import axios from 'axios';
import config from '../config';
import { IPlantListQueryParams } from '../types/ApiData';

const perenualApi = axios.create({
  baseURL: config.perenualApi.baseUrl,
  params: {
    key: config.perenualApi.apiKey,
  },
});

export const getPlantsList = (params: IPlantListQueryParams) => {
  const url = "/species-list";

  return perenualApi.get(url, { params });
};

export const getPlantDetails = (id: number) => {
  const url = `/species/details-list/${id}`;

  return perenualApi.get(url);
};

const trefleApi = axios.create({
  baseURL: config.trefleApi.baseUrl,
  params: {
    token: config.trefleApi.apiKey,
  },
});
