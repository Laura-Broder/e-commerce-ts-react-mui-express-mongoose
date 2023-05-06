export interface ISingInFormState {
  email: string;
  password: string;
}

export interface IPlantListRes {
  data: IListItem[];
  to?: number | null;
  per_page?: number;
  current_page?: number;
  from?: number | null;
  last_page?: number;
  total?: number;
}

export interface IListItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}
export interface ICartItem extends IListItem {
  _id: string;
  inCart: true;
  quantity: number;
}
export interface IWishedItem extends IListItem {
  _id: string;
  wished: true;
}
export interface IUser {
  _id?: string;
  email?: string;
  cart?: ICartItem[];
  wishlist?: IWishedItem[];
}
export enum AlertSeverityEnum {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

export interface IGlobalAlert {
  show?: boolean;
  type?: AlertSeverityEnum;
  title?: string;
  content?: string;
}
export interface IState {
  query?: string;
  user?: IUser;
  searchResults?: IPlantListRes;
  isLoading?: boolean;
  globalAlert?: IGlobalAlert;
}

export interface IAction {
  type: string;
  payload?: IState;
}
