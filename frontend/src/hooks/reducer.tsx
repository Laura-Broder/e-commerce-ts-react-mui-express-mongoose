import { deepCopy } from "../utils/helpers";
import { Action, IState } from "../utils/types";

const reducer = (state: IState, action: Action): IState => {
  const newState = deepCopy(state);
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
    default:
      break;
  }
  return newState;
};

export default reducer;
