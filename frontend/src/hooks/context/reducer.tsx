import { deepCopy } from "../../utils/helpers";
import { IAction, IState } from "../../utils/types";

const reducer = (state: IState, action: IAction): IState => {
  const newState: IState = deepCopy(state);
  switch (action.type) {
    case "SET_USER":
      newState.user = action.payload?.user;
      break;
    case "SET_QUERY":
      newState.query = action.payload?.query ?? newState.query;
      break;
    case "SET_SEARCH_RESULTS":
      newState.searchResults = action.payload?.searchResults;
      break;
    case "SET_GLOBAL_ALERT":
      newState.globalAlert = action.payload?.globalAlert;
      break;
    default:
      break;
  }
  return newState;
};

export default reducer;
