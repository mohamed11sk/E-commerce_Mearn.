import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL_BACK } from "../consts/fileconst";
import { useAuth } from "../ontext/Auth/Authcontext";

const CartPage = () => {
  const [cart, SetCart] = useState();
  const [err, set_err] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const reyravcart = async () => {
      try {
        const res = await fetch(`${BASE_URL_BACK}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        SetCart(data);
        console.log(data);
      } catch (err) {
        set_err("Erorr Fetch Cart");
      }
    };
    reyravcart();
  }, []);

  return (
    <Container
      sx={{
        py: 5,
        maxWidth: "1600px",
        mx: "auto",
      }}
    >
      <Typography> {}</Typography>
    </Container>
  );
};

export default CartPage;
