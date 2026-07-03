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
  Grid,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../ontext/Auth/Authcontext";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const { token, email, isAuthenticatio, logout } = useAuth();

  console.log("From nav ", { token });
  const navigate = useNavigate();

  const HandelLogout = () => {
    logout();
    navigate("/");
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
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 4,
            }}
          ></Box>
          {isAuthenticatio ? (
            <Grid container spacing={2}   >
              <Grid size="grow" sx={{display:"flex" ,alignItems :"center" , justifyContent :"center" ,gap:2  }}>
                <Typography>{email}</Typography>
                      <Button onClick={HandelLogout} variant="contained" color="info">
                  Logout
                </Button>
              </Grid>

              
            </Grid>
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
