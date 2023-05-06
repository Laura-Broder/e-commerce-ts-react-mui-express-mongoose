import { createContext, ReactNode, useCallback, useReducer } from "react";
import { IState, IUser, PlantListRes } from "../utils/types";
import reducer from "./reducer";

interface IContextState extends IState {
  setUser: (user: IUser) => void;
  clearUser: VoidFunction;
  setQuery: (query: string) => void;
  setSearchResults: (res: PlantListRes) => void;
}

const initialState: IContextState = {
  user: { _id: "", email: "", cart: [], wishlist: [] },
  query: "",
  searchResults: {
    data: [],
    to: null,
    per_page: 30,
    current_page: 1,
    from: null,
    last_page: 1,
    total: 0,
  },
  setQuery: (_query: string) => {},
  setUser: (_user: IUser) => {},
  clearUser: () => {},
  setSearchResults: (_res: PlantListRes) => {},
};

export const appContext = createContext<IContextState>(initialState);

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, query, searchResults } = state;
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
  const setQuery = useCallback(
    (query: string): void =>
      dispatch({
        type: "SET_QUERY",
        payload: { query },
      }),
    []
  );
  const setSearchResults = useCallback(
    (searchRes: PlantListRes): void =>
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: { searchResults: searchRes },
      }),
    []
  );

  return (
    <appContext.Provider
      value={{
        user,
        query,
        searchResults,
        setQuery,
        setUser,
        clearUser,
        setSearchResults,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default ContextProvider;
