import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { appContext } from "../hooks/context";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { ICartItem, IListItem, IWishedItem } from "../utils/types";

type Props = {
  items?: IListItem[] | ICartItem[] | IWishedItem[];
};

const Gallery = ({ items }: Props) => {
  const { isLoading } = useContext(appContext);
  const { getItemQuantity, addToCart, removeFromCart } = useCart();
  const { isWished, addToWishlist, removeFromWishlist } = useWishlist();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <ImageList gap={16} cols={sm ? 4 : 2}>
      {!items?.length ? (
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
        items?.map((item: IListItem) => (
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
              {getItemQuantity(item.id) ? (
                <IconButton
                  color="primary"
                  aria-label="remove from shopping cart"
                  onClick={() => removeFromCart(item.id)}
                >
                  <RemoveShoppingCartIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={() => addToCart(item)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              )}
              {isWished(item.id) ? (
                <IconButton
                  color="primary"
                  aria-label="remove from wishlist"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="add to wishlist"
                  onClick={() => addToWishlist(item)}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </CardActions>
          </Card>
        ))
      )}
    </ImageList>
  );
};

export default Gallery;
