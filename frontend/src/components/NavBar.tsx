import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import { useAuth } from "../ontext/Auth/Authcontext";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const { token, email, isAuthenticatio } = useAuth();
  console.log("From nav ", { token });

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
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 2,
            }}
          ></Box>
          {isAuthenticatio ? (
            <Typography>{email}</Typography>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="info"
            >
              Login
            </Button>
          )}

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
