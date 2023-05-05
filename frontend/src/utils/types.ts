export interface ISingInFormState {
  email: string;
  password: string;
}

export interface PlantListRes {
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
}
export interface IUser {
  _id?: string;
  email?: string;
  cart?: ICartItem[];
  wishlist?: ICartItem[];
}

export interface IState {
  user?: IUser;
  products?: PlantListRes;
}

export interface Action {
  type: string;
  payload?: IState;
}
