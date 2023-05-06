import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalAlert from "../components/GlobalAlert";
import PrimaryAppBar from "../components/PrimaryAppBar";
import ScrollToTop from "../components/ScrollToTop";
import useGlobalAlert from "../hooks/useGlobalAlert";

type Props = {};

const Root = (props: Props) => {
  const { globalAlert, removeGlobalAlert } = useGlobalAlert();
  return (
    <Box sx={{ width: "100%" }}>
      <PrimaryAppBar />
      <GlobalAlert {...globalAlert} onClose={removeGlobalAlert} />
      <Outlet />
      <ScrollToTop />
    </Box>
  );
};

export default Root;
