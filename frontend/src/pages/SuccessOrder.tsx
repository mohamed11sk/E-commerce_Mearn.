
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Button, Card, Container, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

const SuccessOrder = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 10 },
        background: "linear-gradient(145deg, #f4faf8 0%, #ffffff 58%, #fff9eb 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: 3,
            textAlign: "center",
            border: "1px solid #dcebe6",
            boxShadow: "0 24px 70px rgba(24, 59, 69, 0.10)",
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              mx: "auto",
              mb: 3,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              bgcolor: "#e2f4ed",
              color: "#16796f",
            }}
          >
            <CheckCircleOutlinedIcon sx={{ fontSize: 62 }} />
          </Box>

          <Typography variant="overline" sx={{ color: "#16796f", fontWeight: 800, letterSpacing: 1.6 }}>
            Order confirmed
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, color: "#183b45", fontWeight: 850, fontSize: { xs: "2rem", sm: "2.7rem" } }}>
            Thank you for your order
          </Typography>
          <Typography sx={{ mt: 2, color: "#66757d", lineHeight: 1.8 }}>
            Your order has been received and is now being prepared for delivery.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Stack spacing={2} sx={{ textAlign: "left" }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <ShoppingBagOutlinedIcon sx={{ color: "#16796f" }} />
              <Box>
                <Typography sx={{ color: "#183b45", fontWeight: 800 }}>Order placed</Typography>
                <Typography variant="body2" sx={{ color: "#66757d" }}>Your payment request was received.</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <LocalShippingOutlinedIcon sx={{ color: "#16796f" }} />
              <Box>
                <Typography sx={{ color: "#183b45", fontWeight: 800 }}>Preparing for delivery</Typography>
                <Typography variant="body2" sx={{ color: "#66757d" }}>We will deliver your order to the address provided.</Typography>
              </Box>
            </Stack>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 5 }}>
            <Button
              component={Link}
              to="/"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#16796f", py: 1.3, borderRadius: 2, textTransform: "none", fontWeight: 800, "&:hover": { bgcolor: "#105d56" } }}
            >
              Continue shopping
            </Button>
            <Button
              component={Link}
              to="/cart"
              fullWidth
              variant="outlined"
              sx={{ color: "#183b45", borderColor: "#c6d8d4", py: 1.3, borderRadius: 2, textTransform: "none", fontWeight: 800 }}
            >
              View cart
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default SuccessOrder;
