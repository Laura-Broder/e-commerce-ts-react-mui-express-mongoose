import { useContext, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { appContext } from "./context";
import { useAxios } from "./useAxios";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

type Props = {};

const useSearch = () => {
  const [term, setTerm] = useState<string>("");
  const debouncedValue = useDebounce<string>(term, 500);
  const { get } = useAxios();
  const { setProducts } = useContext(appContext);

  useEffect(() => {
    const getProducts = async () => {
      const params = { q: debouncedValue || randomCharacter };
      const searchRes = await get("/products", params);
      setProducts(searchRes.data);
    };

    getProducts();
  }, [debouncedValue, get, setProducts]);
  return { term, setTerm };
};

export default useSearch;
