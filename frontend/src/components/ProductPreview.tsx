import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import MobileStepper from "@mui/material/MobileStepper";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { ICartItem, IListItem, IWishedItem } from "../utils/types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
type Props = {
  isOpen: boolean;
  close: VoidFunction;
  item: IListItem | ICartItem | IWishedItem;
  showNext: VoidFunction | undefined;
  showPrev: VoidFunction | undefined;
  itemsCount: number;
  index: number;
};

export default function ProductPreview({
  isOpen,
  close,
  item,
  showNext,
  showPrev,
  itemsCount,
  index,
}: Props) {
  const { getItemQuantity, addToCart, removeFromCart } = useCart();
  const { isWished, addToWishlist, removeFromWishlist } = useWishlist();
  const theme = useTheme();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Paper sx={style} elevation={3}>
          {/* <Card key={item.id}> */}
          <CardActionArea>
            {item.imageUrl ? (
              <CardMedia
                component="img"
                src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
              />
            ) : (
              <CardMedia
                component={YardTwoToneIcon}
                sx={{ fontSize: 400, maxWidth: "80vw", m: "auto" }}
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
          </CardActions>
          {/* </Card> */}
          <MobileStepper
            variant="text"
            steps={itemsCount}
            position="static"
            activeStep={index}
            nextButton={
              <Button size="small" onClick={showNext} disabled={!showNext}>
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={showPrev} disabled={!showPrev}>
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Paper>
      </Fade>
    </Modal>
  );
}
