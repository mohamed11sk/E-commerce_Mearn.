import { useEffect } from "react";
import { useAuth } from "../ontext/Auth/Authcontext";
import { Box, Typography } from "@mui/material";

export const MyOrder = () => {
  const { orders, getmyorders } = useAuth();

  useEffect(() => {
    getmyorders();
  }, []);

  console.log(orders);

  // Always normalize orders into an array, whether it comes back as a single object, an array, or undefined
  const ordersList = Array.isArray(orders) ? orders : orders ? [orders] : [];

  return (
    <>
      {ordersList.map(({ _id, adress, totalprice, items }: any) => {
        return (
          <Box
            key={_id}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Order number: {_id}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              Address: {adress}
            </Typography>

            <Box sx={{ mt: 1 }}>
              {items?.map((item: any) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={item.ProductImage}
                    alt={item.ProductTitle}
                    sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: 1 }}
                  />

                  <Typography variant="body2" sx={{ flex: 1, ml: 1 }}>
                    {item.ProductTitle}
                  </Typography>

                  <Typography variant="body2">
                    {item.Quntity} × ${item.priceItem}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: "bold" }}>
              Total: ${totalprice}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

export default MyOrder;