import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import type { Product_DATA } from "../types/producttypes";
import { BASE_URL_BACK } from "../consts/fileconst";

const HomePage = () => {
  const [products, setProducts] = useState<Product_DATA[]>([]);
  const [err, set_err] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL_BACK}/product`);
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        set_err(true);
      }
    };
    fetchData();
  }, []);
  if (err) {
    return <Box>ERORR WHEN FAILD DATA</Box>;
  }
  return (
    <Container
      sx={{
        py: 5,
        maxWidth: "1600px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: "bold",
        }}
      ></Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Products
              _id={product._id}
              title={product.title}
              image={product.image}
              price={product.price}
              descrition={product.descrition}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
