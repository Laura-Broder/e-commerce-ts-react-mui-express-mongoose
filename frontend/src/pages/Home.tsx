import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ProductsGallery from "./catalog/ProductsGallery";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Typography variant="h4" component="div" p={8}>
        home page promotions
      </Typography>
      <Divider variant="middle" />
      <ProductsGallery />
    </div>
  );
};

export default Home;
