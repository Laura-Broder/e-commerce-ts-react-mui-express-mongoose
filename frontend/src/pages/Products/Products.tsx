import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent, useContext } from "react";
import Gallery from "../../components/Gallery";
import { appContext } from "../../hooks/context/context";
import { useAxios } from "../../hooks/useAxios";

type Props = {};

const Products = (props: Props) => {
  const { searchResults, setSearchResults, query } = useContext(appContext);
  const { get } = useAxios();
  const getPage = async (_event: ChangeEvent<unknown>, page: number) => {
    const params = {
      q: query,
      page,
    };
    const searchRes = await get("/products", params);
    setSearchResults(searchRes.data);
  };
  return (
    <Stack spacing={3} p={3}>
      {searchResults?.last_page && searchResults?.last_page > 1 ? (
        <Pagination
          page={searchResults?.current_page}
          onChange={getPage}
          count={searchResults?.last_page}
          showFirstButton={
            !!searchResults?.last_page && searchResults?.last_page > 10
          }
          showLastButton={
            !!searchResults?.last_page && searchResults?.last_page > 10
          }
        />
      ) : null}
      <Gallery items={searchResults?.data} />
    </Stack>
  );
};

export default Products;
