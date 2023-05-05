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
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { appContext } from "../hooks/context";
import { IListItem } from "../utils/types";
type Props = {};

const Products = (props: Props) => {
  const { products } = useContext(appContext);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ImageList
      gap={16}
      cols={sm ? 4 : 2}
      sx={{
        px: 2,
      }}
    >
      {!products?.data.length ? (
        <ImageListItem key="Subheader">
          <ListSubheader component="div">Loading...</ListSubheader>
        </ImageListItem>
      ) : (
        products?.data.map((item: IListItem) => (
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
  );
};

export default Products;
