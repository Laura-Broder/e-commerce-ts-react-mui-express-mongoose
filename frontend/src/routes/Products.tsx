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
import { IListItem } from "../utils/types";

type Props = {};

const Products = (props: Props) => {
  const { searchResults, isLoading } = useContext(appContext);
  // const { setQuery } = useSearch();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    // setQuery({ page: value });
    console.log("file: Products.tsx:32 ~ handleChange ~ value:", value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        page={searchResults?.current_page}
        onChange={handleChange}
        count={searchResults?.last_page}
        showFirstButton
        showLastButton
      />
      <ImageList
        gap={16}
        cols={sm ? 4 : 2}
        sx={{
          px: 2,
        }}
      >
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
