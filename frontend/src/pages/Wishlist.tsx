import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Gallery from "../components/Gallery";
import useAuth from "../hooks/useAuth";
import Divider from "@mui/material/Divider";

type Props = {};

const Wishlist = (props: Props) => {
  const { user } = useAuth();
  return (
    <Stack spacing={3} p={3}>
      <Typography variant="h4">Wishlist</Typography>
      <Divider variant="middle" />

      <Gallery items={user?.wishlist} />
    </Stack>
  );
};

export default Wishlist;
