import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../ontext/Auth/cart/CartContext";
export interface Product_DATA {
  _id: number ;
  title: string;
  image: string;
  price: string;
  descrition: string;
}




const Products = ({
  _id,
  title,
  image,
  price,
  descrition,
}: Product_DATA) => {
  const{AddItem}= useCart()
  return (
    <Card
  
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`${image}?w=500&auto=format&fit=crop`}
        loading="lazy"
        sx={{
          height: 220,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.2rem",
            },
            color: "text.primary",
            mb: 1,
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {descrition}
        </Typography>

        <Typography
          variant="h5"
          color="primary"
          sx={{
            fontWeight: "bold",
            mt: 2,
          }}
        >
          {price} EGY {_id}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button  onClick={()=>AddItem(_id)} variant="contained" fullWidth startIcon={<ShoppingCartIcon />}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Products;
