import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { useCart } from "../ontext/Auth/cart/CartContext";
import { Link } from "react-router";
import { useAuth } from "../ontext/Auth/Authcontext";
import { BASE_URL_BACK } from "../consts/fileconst";
import { useNavigate } from "react-router";

const CartPage = () => {
  const setAddress = useRef<HTMLInputElement>(null);
  const { CartItems, totalamount, updatedquantiy, deleteitemfromcart, clearitem } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handelquantitiy = (productId: string, quantity: number) => {
    void updatedquantiy(productId, quantity);
  };
  const handeldelteitem = (productId: string) => {
    void deleteitemfromcart(productId);
  };
  const handelclearitem = () => {
    void clearitem();
  };
  const processCheckout = async () => {
    const address = setAddress.current?.value.trim() ?? "";
    if (!address) {
      setCheckoutError("Please enter your delivery address.");
      return;
    }

    setCheckoutError("");
    setIsCheckingOut(true);
    try {
      const response = await fetch(`${BASE_URL_BACK}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ adress: address }),
      });

      if (!response.ok) {
        setCheckoutError((await response.text()) || "Checkout failed. Please try again.");
        return;
      }

      navigate("/sucesspage");
      void clearitem();
    } catch {
      setCheckoutError("Could not complete checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (CartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 }, textAlign: "center" }}>
        <Box
          sx={{
            width: 88,
            height: 88,
            mx: "auto",
            mb: 3,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "#e8f3f1",
            color: "#16796f",
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ fontSize: 42 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#183b45", mb: 1 }}>
          Your cart is empty
        </Typography>
        <Typography sx={{ color: "#66757d", mb: 4 }}>
          Discover something useful and add it to your cart.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            px: 3,
            py: 1.3,
            borderRadius: 2,
            bgcolor: "#16796f",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#105d56" },
          }}
        >
          Continue shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        py: { xs: 4, md: 7 },
        maxWidth: "1180px",
      }}
    >
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography variant="overline" sx={{ color: "#16796f", fontWeight: 800, letterSpacing: 1.5 }}>
          Order summary
        </Typography>
        <Typography variant="h3" sx={{ color: "#183b45", fontWeight: 850, fontSize: { xs: "2rem", md: "3rem" } }}>
          Your cart
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography sx={{ color: "#66757d", mt: 1 }}>
            {CartItems.length} {CartItems.length === 1 ? "item" : "items"} ready for checkout
          </Typography>
          <Button
            onClick={handelclearitem}
            startIcon={<DeleteSweepOutlinedIcon />}
            color="error"
            size="small"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Clear cart
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
        <Grid size={{ xs: 12, md: 7.5 }}>
          <Stack spacing={2}>
            {CartItems.map((item) => (
              <Card
                key={item._id}
                elevation={0}
                sx={{ border: "1px solid #e2e9e8", borderRadius: 2.5, overflow: "hidden" }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
                  <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5 }} sx={{ alignItems: "center" }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{ width: { xs: 76, sm: 108 }, height: { xs: 76, sm: 108 }, objectFit: "cover", borderRadius: 2, bgcolor: "#f1f5f4" }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ color: "#183b45", fontWeight: 750, fontSize: { xs: "1rem", sm: "1.15rem" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#16796f", fontWeight: 700, mt: 0.5 }}>
                        {item.unite_price} EGY
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1.5, alignItems: "center" }}>
                        <IconButton onClick={() => handelquantitiy(item._id, item.Quantity - 1)} size="small" aria-label="decrease quantity" sx={{ border: "1px solid #d8e2e0" }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 22, textAlign: "center", fontWeight: 700 }}>{item.Quantity}</Typography>
                        <IconButton onClick={() => handelquantitiy(item._id, item.Quantity + 1)} size="small" aria-label="increase quantity" sx={{ border: "1px solid #d8e2e0" }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                    <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
                      <Typography sx={{ color: "#183b45", fontWeight: 800, whiteSpace: "nowrap" }}>
                        {(Number(item.unite_price) * item.Quantity).toFixed(2)} EGY
                      </Typography>
                      <IconButton onClick={()=>handeldelteitem(item._id)} aria-label="remove item" color="error" size="small">
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4.5 }}>
          <Card elevation={0} sx={{ bgcolor: "#183b45", color: "white", borderRadius: 2.5 }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Order total</Typography>
              <Stack spacing={2}>
                <TextField
                  inputRef={setAddress}
                  label="Delivery address"
                  placeholder="Street, building and city"
                  multiline
                  minRows={2}
                  fullWidth
                  error={Boolean(checkoutError)}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#b9cfcc" },
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                  }}
                />
                {checkoutError && <Alert severity="error">{checkoutError}</Alert>}
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography sx={{ color: "#b9cfcc" }}>Subtotal</Typography>
                  <Typography sx={{ fontWeight: 700 }}>{Number(totalamount).toFixed(2)} EGY</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography sx={{ color: "#b9cfcc" }}>Delivery</Typography>
                  <Typography sx={{ color: "#8bd2c4", fontWeight: 700 }}>Free</Typography>
                </Stack>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.18)" }} />
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>Total</Typography>
                  <Typography variant="h5" sx={{ color: "#8bd2c4", fontWeight: 850 }}>{Number(totalamount).toFixed(2)} EGY</Typography>
                </Stack>
              </Stack>
              <Button onClick={processCheckout} disabled={isCheckingOut} fullWidth variant="contained" sx={{ mt: 4, py: 1.5, borderRadius: 2, bgcolor: "#f5c451", color: "#183b45", textTransform: "none", fontWeight: 800, "&:hover": { bgcolor: "#eab63d" } }}>
                {isCheckingOut ? "Processing..." : "Proceed to checkout"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
