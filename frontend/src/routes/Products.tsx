import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChangeEvent, useContext } from "react";
import { appContext } from "../hooks/context";
import { useAxios } from "../hooks/useAxios";
import { IListItem } from "../utils/types";

type Props = {};

const Products = (props: Props) => {
  const { searchResults, setSearchResults, query, isLoading } =
    useContext(appContext);
  const { get } = useAxios();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
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
      <ImageList gap={16} cols={sm ? 4 : 2}>
        {!searchResults?.data.length ? (
          <ImageListItem key="Subheader">
            <ListSubheader component="div">
              {isLoading ? (
                <Skeleton width={"100%"} />
              ) : (
                <Typography variant="body1">No Results</Typography>
              )}
            </ListSubheader>
          </ImageListItem>
        ) : (
          searchResults?.data.map((item: IListItem) => (
            <Card key={item.id}>
              <CardActionArea>
                {item.imageUrl ? (
                  <CardMedia
                    component="img"
                    height="140"
                    width="140"
                    src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.name}
                  />
                ) : (
                  <CardMedia
                    component={YardTwoToneIcon}
                    sx={{ fontSize: 140, m: "auto" }}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </ImageList>
    </Stack>
  );
};

export default Products;
