import axios from "axios";
import config from "../config";

const perenualApi = axios.create({
  baseURL: config.perenualApi.baseUrl,
  params: {
    key: config.perenualApi.apiKey,
  },
});

interface IPlantListQueryParams {
  page?: number;
  q?: string;
  edible?: boolean | null;
  poisonous?: boolean | null;
  cycle?: "perennial" | "annual" | "biennial" | "biannual";
  watering?: "frequent" | "average" | "minimum" | "none";
  sunlight?: "full_shade" | "part_shade" | "sun-part_shade" | "full_sun";
  indoor?: boolean | null;
  hardiness?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}

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
