import { Action, IState } from '../utils/types';

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload?.user,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload?.products,
      };

    default:
      return state;
  }
};

export default reducer;
