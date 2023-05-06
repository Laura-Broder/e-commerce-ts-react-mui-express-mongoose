import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Gallery from "../components/Gallery";
import useAuth from "../hooks/useAuth";

type Props = {};

const ShoppingCart = (props: Props) => {
  const { user } = useAuth();
  return (
    <Stack spacing={3} p={3}>
      <Typography variant="h4">Shopping Cart</Typography>
      <Gallery items={user?.cart} />;
    </Stack>
  );
};

export default ShoppingCart;
