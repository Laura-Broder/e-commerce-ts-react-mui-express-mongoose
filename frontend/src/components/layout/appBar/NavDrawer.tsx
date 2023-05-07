import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

interface ListItemLinkProps {
  primary: string;
  to: string;
  selected?: boolean;
}
function ListItemLink({ primary, to, selected }: ListItemLinkProps) {
  return (
    <li>
      <ListItemButton component={RouterLink} to={to} selected={selected}>
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const routeMatch = useRouteMatch([
    "/",
    "/about",
    "/products",
    "/products/:productId",
  ]);
  const currentRoute = routeMatch?.pattern?.path;

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItemLink
              key="home"
              to="/"
              primary="Home"
              selected={currentRoute === "/"}
            />
            <ListItemLink
              key="about"
              to="/about"
              primary="About"
              selected={currentRoute === "/about"}
            />
            <ListItemLink
              key="products"
              to="/products"
              primary="Products"
              selected={currentRoute?.includes("/products")}
            />
          </List>
        </Box>
      </Drawer>
    </>
  );
}
