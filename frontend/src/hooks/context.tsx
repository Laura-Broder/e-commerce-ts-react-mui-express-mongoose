import { createContext, ReactNode, useCallback, useReducer } from "react";
import { IGlobalAlert, IPlantListRes, IState, IUser } from "../utils/types";
import reducer from "./reducer";

interface IContextState extends IState {
  setUser: (user: IUser) => void;
  clearUser: VoidFunction;
  setQuery: (query: string) => void;
  setSearchResults: (res: IPlantListRes) => void;
  setGlobalAlert: (alert: IGlobalAlert) => void;
  removeGlobalAlert: VoidFunction;
}
export const emptySearchResults: IPlantListRes = {
  data: [],
  to: null,
  per_page: 30,
  current_page: 1,
  from: null,
  last_page: 1,
  total: 0,
};
export const noUser: IUser = { _id: "", email: "", cart: [], wishlist: [] };
export const noGlobalAlert: IGlobalAlert = { show: false };
export const initialState: IContextState = {
  user: noUser,
  query: "",
  searchResults: emptySearchResults,
  globalAlert: noGlobalAlert,
  setQuery: (_query: string) => {},
  setUser: (_user: IUser) => {},
  clearUser: () => {},
  setSearchResults: (_res: IPlantListRes) => {},
  setGlobalAlert: (_a: IGlobalAlert) => {},
  removeGlobalAlert: () => {},
};

export const appContext = createContext<IContextState>(initialState);

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, query, searchResults, globalAlert } = state;
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
        payload: { user: noUser },
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
    (searchRes: IPlantListRes): void =>
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: { searchResults: searchRes },
      }),
    []
  );
  const setGlobalAlert = useCallback(
    (alert: IGlobalAlert): void =>
      dispatch({
        type: "SET_GLOBAL_ALERT",
        payload: { globalAlert: alert },
      }),
    []
  );
  const removeGlobalAlert = useCallback(
    (): void =>
      dispatch({
        type: "SET_GLOBAL_ALERT",
        payload: { globalAlert: noGlobalAlert },
      }),
    []
  );

  return (
    <appContext.Provider
      value={{
        user,
        query,
        searchResults,
        globalAlert,
        setQuery,
        setUser,
        clearUser,
        setSearchResults,
        setGlobalAlert,
        removeGlobalAlert,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default ContextProvider;
