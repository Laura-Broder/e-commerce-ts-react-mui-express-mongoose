import { Outlet } from "react-router-dom";

type Props = {};

const Catalog = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Catalog;
