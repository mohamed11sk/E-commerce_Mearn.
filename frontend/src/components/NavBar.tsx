import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Badge,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../ontext/Auth/Authcontext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const { token, email, isAuthenticatio, logout } = useAuth();

  console.log("From nav ", { token });
  const navigate = useNavigate();

  const HandelLogout = () => {
    logout();
    navigate("/");
  };
  const navigatToCart = () => {
  
    navigate("/cart");
  };

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Flow Point
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton onClick={navigatToCart} aria-label="cart"  sx={{color:"white"}}>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isAuthenticatio ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  px: 2,
                  py: 0.8,
                  borderRadius: "30px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Typography
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                    },
                    fontSize: {
                      xs: "11px",
                      sm: "12px",
                      md: "13px",
                      lg: "15px",
                    },
                    maxWidth: {
                      xs: 80,
                      sm: 100,
                      md: 140,
                      lg: 180,
                    },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {email}
                </Typography>

                <Button
                  onClick={HandelLogout}
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 2,
                    fontWeight: 600,
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="info"
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  px: 3,
                  fontWeight: 600,
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}></Box>
      </Drawer>
    </>
  );
};

export default NavBar;
