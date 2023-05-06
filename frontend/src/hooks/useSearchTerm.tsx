import { useContext, useEffect } from "react";
import { getRandomCharacter } from "../utils/helpers";
import { appContext } from "./context";
import { useAxios } from "./useAxios";

const useSearchTerm = () => {
  const { setSearchResults, query, setQuery } = useContext(appContext);
  const { get } = useAxios();

  useEffect(() => {
    const getData = setTimeout(async () => {
      const params = {
        q: query || getRandomCharacter(),
      };
      const searchRes = await get("/products", params);
      setSearchResults(searchRes.data);
    }, 500);

    return () => clearTimeout(getData);
  }, [get, setSearchResults, query]);

  return { query, setQuery };
};

export default useSearchTerm;
