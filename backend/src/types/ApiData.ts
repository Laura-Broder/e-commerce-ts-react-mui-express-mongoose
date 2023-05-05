export interface IListItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

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

export interface PlantListRes {
  data: Datum[];
  to?: number;
  per_page?: number;
  current_page?: number;
  from?: number;
  last_page?: number;
  total?: number;
}

export interface Datum {
  id: number;
  common_name: string;
  scientific_name?: string[];
  other_name?: string[] | null;
  cycle?: string;
  watering?: string;
  sunlight?: any[];
  default_image?: DefaultImage;
}

export interface DefaultImage {
  image_id?: number;
  license?: number;
  license_name?: string;
  license_url?: string;
  original_url?: string;
  regular_url?: string;
  medium_url?: string;
  small_url?: string;
  thumbnail?: string;
}

//  https://perenual.com/api/species/details/[ID]?key=[YOUR-API-KEY]
//  https://perenual.com/docs/api#:~:text=405%2C%0A%20%20%20%20%22total%22%3A%2010104%0A%7D-,Plant%20Details,-https%3A//perenual.com

export interface PlantDetails {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family?: string;
  origin?: null;
  type?: string;
  dimension?: string;
  cycle?: string;
  watering?: string;
  attracts?: string[];
  propagation?: string[];
  hardiness?: Hardiness;
  hardiness_location?: HardinessLocation;
  flowers?: boolean;
  flowering_season?: string;
  color?: string;
  sunlight?: string[];
  soil?: any[];
  problem?: string;
  pest_susceptibility?: null;
  cones?: boolean;
  fruits?: boolean;
  edible_fruit?: boolean;
  edible_fruit_taste_profile?: string;
  fruit_nutritional_value?: string;
  fruit_color?: null;
  fruiting_season?: null;
  harvest_season?: null;
  harvest_method?: string;
  leaf?: boolean;
  leaf_color?: string[];
  edible_leaf?: boolean;
  edible_leaf_taste_profile?: string;
  leaf_nutritional_value?: string;
  growth_rate?: string;
  maintenance?: string;
  medicinal?: boolean;
  medicinal_use?: string;
  medicinal_method?: string;
  poisonous_to_humans?: boolean;
  poison_effects_to_humans?: string;
  poison_to_humans_cure?: string;
  poisonous_to_pets?: boolean;
  poison_effects_to_pets?: string;
  poison_to_pets_cure?: string;
  drought_tolerant?: boolean;
  salt_tolerant?: boolean;
  thorny?: boolean;
  invasive?: boolean;
  rare?: boolean;
  rare_level?: string;
  tropical?: boolean;
  cuisine?: boolean;
  cuisine_list?: string;
  indoor?: boolean;
  care_level?: string;
  description?: string;
  default_image?: DefaultImage;
}

export interface Hardiness {
  min?: string;
  max?: string;
}

export interface HardinessLocation {
  fullURL?: string;
  fullIframe?: string;
}
