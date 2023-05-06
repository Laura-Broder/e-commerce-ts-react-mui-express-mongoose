import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import GlobalAlert from "../components/GlobalAlert";
import ScrollToTop from "../components/ScrollToTop";
import PrimaryAppBar from "../components/appBar/PrimaryAppBar";
import useGlobalAlert from "../hooks/useGlobalAlert";

type Props = {};
const OffsetFixedAppBar = styled("div")(({ theme }) => theme.mixins.toolbar);

const Root = (props: Props) => {
  const { globalAlert, removeGlobalAlert } = useGlobalAlert();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <PrimaryAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <OffsetFixedAppBar />

        <GlobalAlert {...globalAlert} onClose={removeGlobalAlert} />
        <Outlet />
        <Footer />
      </Box>
      <ScrollToTop />
    </Box>
  );
};

export default Root;
