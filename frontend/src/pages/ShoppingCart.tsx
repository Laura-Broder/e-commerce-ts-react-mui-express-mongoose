import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Gallery from "../components/Gallery";
import useAuth from "../hooks/useAuth";

type Props = {};

const CheckoutButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      size="large"
      onClick={() => navigate("/checkout")}
    >
      Checkout
    </Button>
  );
};

const ShoppingCart = (props: Props) => {
  const { user } = useAuth();

  return (
    <Stack spacing={3} p={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant="h4">Shopping Cart</Typography>
        <CheckoutButton />
      </Stack>
      <Divider variant="middle" />
      <Gallery items={user?.cart} />
      <CheckoutButton />
    </Stack>
  );
};

export default ShoppingCart;
