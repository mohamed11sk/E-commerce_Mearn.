import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link } from "react-router";
import { useRef, useState } from "react";
import { useAuth } from "../ontext/Auth/Authcontext";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const emailref = useRef<HTMLInputElement>(null);
  const passref = useRef<HTMLInputElement>(null);

  const [error, seterorr] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const register = async () => {

    const email = emailref.current?.value;
    const pass = passref.current?.value;
    console.log( email, pass);
    //Call context Provider

    //call Api register
    try {
      const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          pass,
        }),
      });

      const token = await response.json();
      if (!email || !pass) {
        return;
      }

      if (!response.ok) {
        seterorr("Incorect Email or Pass ");
        return;
      }

      login(email, token);
      //  Navigatio to Home
      navigate("/");

      console.log(token);
    } catch (error) {
      seterorr("erorr insert data");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <PersonAddAlt1Icon />
          </Avatar>

          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Login
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join Flow Point and start shopping today.
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              name="email"
              inputRef={emailref}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              name="pass"
              inputRef={passref}
            />

            <Button
              onClick={register}
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Creat New Acount{" "}
            <Typography
              component={Link}
              to="/register"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                fontWeight: "bold",
                display: "inline",
              }}
            >
              Register
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
