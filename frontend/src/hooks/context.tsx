import { createContext, ReactNode, useCallback, useReducer } from "react";
import { IState, IUser, PlantListRes } from "../utils/types";
import reducer from "./reducer";

interface IContextState extends IState {
  setUser: (user: IUser) => void;
  clearUser: VoidFunction;
  setProducts: (products: PlantListRes) => void;
}

const initialState: IContextState = {
  user: { _id: "", email: "", cart: [], wishlist: [] },
  products: {
    data: [],
    to: null,
    per_page: 30,
    current_page: 1,
    from: null,
    last_page: 1,
    total: 0,
  },
  setUser: (_user: IUser) => {},
  clearUser: () => {},
  setProducts: (_products: PlantListRes) => {},
};

export const appContext = createContext<IContextState>(initialState);

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, products } = state;
  const setUser = useCallback(
    (newUser: IUser): void =>
      dispatch({
        type: "SET_USER",
        payload: { user: newUser },
      }),
    []
  );
  const clearUser = useCallback(
    (): void =>
      dispatch({
        type: "SET_USER",
        payload: { user: initialState.user },
      }),
    []
  );

  const setProducts = useCallback(
    (newProducts: PlantListRes): void =>
      dispatch({
        type: "SET_PRODUCTS",
        payload: { products: newProducts },
      }),
    []
  );

  return (
    <appContext.Provider
      value={{
        user,
        products,
        setUser,
        clearUser,
        setProducts,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default ContextProvider;
