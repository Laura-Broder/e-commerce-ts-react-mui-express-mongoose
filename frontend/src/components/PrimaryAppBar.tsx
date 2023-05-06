import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavDrawer from "./NavDrawer";
import Search from "./Search";

const OffsetFixedAppBar = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function PrimaryAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const { isAuthenticated, logout, user } = useAuth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated
        ? [
            <MenuItem key="profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>,
            <MenuItem key="my-account" onClick={handleMenuClose}>
              My account
            </MenuItem>,
            <MenuItem key="sign-out" onClick={handleLogout}>
              Sign out
            </MenuItem>,
          ]
        : [
            <MenuItem
              key="signin"
              component={Link}
              to="/signin"
              onClick={handleMenuClose}
            >
              Sign in
            </MenuItem>,
            <MenuItem
              key="signup"
              component={Link}
              to="/signup"
              onClick={handleMenuClose}
            >
              Sign up
            </MenuItem>,
          ]}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/wishlist">
        <IconButton
          size="large"
          aria-label={
            "show" + (user?.wishlist?.length || "0") + " favorite items"
          }
          color="inherit"
        >
          <Badge badgeContent={user?.wishlist?.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Wishlist</p>
      </MenuItem>
      <MenuItem component={Link} to="/shopping-cart">
        <IconButton
          size="large"
          aria-label={"show" + (user?.cart?.length || "0") + " cart items"}
          color="inherit"
        >
          <Badge badgeContent={user?.cart?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {isAuthenticated ? <AccountCircle /> : <ArrowDropDownCircleIcon />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} id="back-to-top-anchor">
      <AppBar position="fixed">
        <Toolbar>
          <NavDrawer />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            MUI
          </Typography>
          <Search />
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              component={Link}
              to="/wishlist"
              size="large"
              aria-label={
                "show" + (user?.wishlist?.length || 0) + "favorite items"
              }
              color="inherit"
            >
              <Badge badgeContent={user?.wishlist?.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              component={Link}
              to="/shopping-cart"
              size="large"
              aria-label={"show" + (user?.cart?.length || "0") + " cart items"}
              color="inherit"
            >
              <Badge badgeContent={user?.cart?.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isAuthenticated ? (
                <AccountCircle />
              ) : (
                <ArrowDropDownCircleIcon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <OffsetFixedAppBar />
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
