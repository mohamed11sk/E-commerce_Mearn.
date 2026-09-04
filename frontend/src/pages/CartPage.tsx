import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../ontext/Auth/cart/CartContext";

const CartPage = () => {
  const { CartItems } = useCart();

  return (
    <Container
      sx={{
        py: 5,
        maxWidth: "1600px",
        mx: "auto",
      }}
    >
  {CartItems.map((i)=>(
   <Box key={i._id}>{i.title}</Box>
   ))}
    </Container>
  );
};

export default CartPage;
