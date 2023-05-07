import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
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
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../hooks/context/context";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import ProductPreview from "../pages/catalog/ProductPreview";
import { ProductType } from "../utils/types";

type Props = {
  items?: ProductType[];
};

const Gallery = ({ items }: Props) => {
  const navigate = useNavigate();
  const [itemToPreview, setItemToPreview] = useState<number | undefined>(
    undefined
  );
  const canShowNext = (i: number) =>
    items?.length ? i + 1 < items?.length : false;
  const canShowPrev = (i: number) => i > 0;

  const { isLoading } = useContext(appContext);
  const { getItemQuantity, addToCart, removeFromCart } = useCart();
  const { isWished, addToWishlist, removeFromWishlist } = useWishlist();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
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
          items?.map((item: ProductType, index) => (
            <Card key={item.id}>
              <CardActionArea onClick={() => navigate(`/catalog/${item.id}`)}>
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
              <CardActions
                sx={{
                  justifyContent: "space-between",
                }}
              >
                {getItemQuantity(item.id) ? (
                  <IconButton
                    color="primary"
                    aria-label="remove from shopping cart"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Tooltip title="remove from cart" arrow>
                      <RemoveShoppingCartIcon />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    onClick={() => addToCart(item)}
                  >
                    <Tooltip title="add to cart" arrow>
                      <AddShoppingCartIcon />
                    </Tooltip>
                  </IconButton>
                )}
                {isWished(item.id) ? (
                  <IconButton
                    color="primary"
                    aria-label="remove from wishlist"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Tooltip title="remove from wishlist" arrow>
                      <FavoriteIcon />
                    </Tooltip>
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="add to wishlist"
                    onClick={() => addToWishlist(item)}
                  >
                    <Tooltip title="add to wishlist" arrow>
                      <FavoriteBorderIcon />
                    </Tooltip>
                  </IconButton>
                )}
                <IconButton
                  color="primary"
                  aria-label="preview item"
                  onClick={() => setItemToPreview(index)}
                >
                  <Tooltip title="show item preview" arrow>
                    <VisibilityOutlinedIcon />
                  </Tooltip>
                </IconButton>
              </CardActions>
              <ProductPreview
                isOpen={itemToPreview === index}
                close={() => setItemToPreview(undefined)}
                item={item}
                showNext={
                  canShowNext(index)
                    ? () => setItemToPreview(index + 1)
                    : undefined
                }
                showPrev={
                  canShowPrev(index)
                    ? () => setItemToPreview(index - 1)
                    : undefined
                }
                itemsCount={items.length}
                index={index}
              />
            </Card>
          ))
        )}
      </ImageList>
    </>
  );
};

export default Gallery;
