export const cycleOptions = [
  "perennial",
  "annual",
  "biennial",
  "biannual",
] as const;
export const wateringOptions = [
  "frequent",
  "average",
  "minimum",
  "none",
] as const;

export const sunlightOptions = [
  "full_shade",
  "part_shade",
  "sun-part_shade",
  "full_sun",
] as const;
export const hardnessOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const;

export type CycleType = (typeof cycleOptions)[number];
export type WateringType = (typeof wateringOptions)[number];
export type SunlightType = (typeof sunlightOptions)[number];
export type HardnessType = (typeof hardnessOptions)[number];

export interface IPlantListQueryParams {
  q: string;
  page?: number;
  edible?: boolean | null;
  poisonous?: boolean | null;
  cycle?: CycleType;
  watering?: WateringType;
  sunlight?: SunlightType;
  indoor?: boolean | null;
  hardiness?: HardnessType;
}

// https://perenual.com/api/species-list?page=1&key=[YOUR-API-KEY]
// https://perenual.com/docs/api#:~:text=Online-,Plant%20List,-https%3A//perenual.com

export interface PlantList {
  data: Datum[];
  to: number;
  perPage: number;
  currentPage: number;
  from: number;
  lastPage: number;
  total: number;
}

export interface Datum {
  id: number;
  commonName: string;
  scientificName: string[];
  otherName: string[] | null;
  cycle?: string;
  watering?: string;
  sunlight: string[];
  defaultImage: DefaultImage;
}

export interface DefaultImage {
  imageID: number;
  license: number;
  licenseName: string;
  licenseURL: string;
  originalURL: string;
  regularURL: string;
  mediumURL: string;
  smallURL: string;
  thumbnail: string;
}

//  https://perenual.com/api/species/details/[ID]?key=[YOUR-API-KEY]
//  https://perenual.com/docs/api#:~:text=405%2C%0A%20%20%20%20%22total%22%3A%2010104%0A%7D-,Plant%20Details,-https%3A//perenual.com

export interface PlantDetails {
  id: number;
  commonName: string;
  scientificName: string[];
  otherName: string[];
  family?: string;
  origin?: null;
  type?: string;
  dimension?: string;
  cycle?: string;
  watering?: string;
  attracts?: string[];
  propagation?: string[];
  hardiness?: Hardiness;
  hardinessLocation?: HardinessLocation;
  flowers?: boolean;
  floweringSeason?: string;
  color?: string;
  sunlight?: string[];
  soil?: any[];
  problem?: string;
  pestSusceptibility?: null;
  cones?: boolean;
  fruits?: boolean;
  edibleFruit?: boolean;
  edibleFruitTasteProfile?: string;
  fruitNutritionalValue?: string;
  fruitColor?: null;
  fruitingSeason?: null;
  harvestSeason?: null;
  harvestMethod?: string;
  leaf?: boolean;
  leafColor?: string[];
  edibleLeaf?: boolean;
  edibleLeafTasteProfile?: string;
  leafNutritionalValue?: string;
  growthRate?: string;
  maintenance?: string;
  medicinal?: boolean;
  medicinalUse?: string;
  medicinalMethod?: string;
  poisonousToHumans?: boolean;
  poisonEffectsToHumans?: string;
  poisonToHumansCure?: string;
  poisonousToPets?: boolean;
  poisonEffectsToPets?: string;
  poisonToPetsCure?: string;
  droughtTolerant?: boolean;
  saltTolerant?: boolean;
  thorny?: boolean;
  invasive?: boolean;
  rare?: boolean;
  rareLevel?: string;
  tropical?: boolean;
  cuisine?: boolean;
  cuisineList?: string;
  indoor?: boolean;
  careLevel?: string;
  description?: string;
  defaultImage?: DefaultImage;
}

export interface Hardiness {
  min?: string;
  max?: string;
}

export interface HardinessLocation {
  fullURL?: string;
  fullIframe?: string;
}
