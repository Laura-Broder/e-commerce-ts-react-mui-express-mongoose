import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PrimaryAppBar from '../components/PrimaryAppBar';
import ScrollToTop from '../components/ScrollToTop';

type Props = {};

const Root = (props: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <PrimaryAppBar />
      <Outlet />
      <ScrollToTop />
    </Box>
  );
};

export default Root;
