import axios from "axios";
import config from "../config";
import {
  Datum,
  DefaultImage,
  IListItem,
  IPlantListQueryParams,
  PlantListRes,
} from "../types/ApiData";

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

const getName = (p: Datum): string => {
  return (
    p?.common_name ||
    (p?.other_name && p?.other_name[0]) ||
    (p?.scientific_name && p?.scientific_name[0]) ||
    "Unknown"
  );
};

const getImageUrl = (defaultImage: DefaultImage | undefined): string => {
  return (
    (defaultImage &&
      (defaultImage.thumbnail ||
        defaultImage.small_url ||
        defaultImage.medium_url ||
        defaultImage.regular_url ||
        defaultImage.original_url)) ||
    ""
  );
};

export const mapResData = (resData: PlantListRes) => {
  const data = resData.data.map((p: Datum): IListItem => {
    return {
      id: p.id,
      name: getName(p),
      imageUrl: getImageUrl(p.default_image),
      price: 100,
    };
  });
  return { ...resData, data };
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
const trefleApi = axios.create({
  baseURL: config.trefleApi.baseUrl,
  params: {
    token: config.trefleApi.apiKey,
  },
});
