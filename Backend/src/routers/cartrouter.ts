import express, { Request } from "express";
import {
  AddItemCart,
  checkoutorder,
  DeleteItemCart,
  DeletwAlllproduct,
  GetActiveCart,
  UpdateItemCart,
} from "../services/cartService.js";
import validationJwt from "../modileware/validationJWT.js";
import { ExtendRequest } from "../types/extendReqest.js";

const router = express.Router();

router.get("/", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const user_id = req.user._id;
    const cart = await GetActiveCart({ Userid: user_id });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const user_id = req.user._id;
    const DeletwAlllproducts = await DeletwAlllproduct({ Userid: user_id });
    res.status(DeletwAlllproducts.status).send(DeletwAlllproducts.data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// put item in cart and update price
router.post("/item", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const Userid = req.user._id;
    const { productId, Quntity } = req.body;

    const Add_item_to_cart = await AddItemCart({ productId, Quntity, Userid });
    res.status(Add_item_to_cart.status).send(Add_item_to_cart.data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// Update item in cart and update Totalprice
router.put("/item", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const Userid = req.user._id;
    const { productId, Quntity } = req.body;

    const Update_item_in_cart = await UpdateItemCart({
      productId,
      Quntity,
      Userid,
    });
    res.status(Update_item_in_cart.status).send(Update_item_in_cart.data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
// Delete item from cart
router.delete(
  "/item/:productId",
  validationJwt,
  async (req: ExtendRequest, res) => {
    try {
      const Userid = req.user._id;
      const productId = req.params.productId as string;
      const Delete_item_from_cart = await DeleteItemCart({ productId, Userid });
      res.status(Delete_item_from_cart.status).send(Delete_item_from_cart.data);
    } catch (err) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
);

//Checkout order
router.post("/checkout", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const Userid = req.user._id;
    const { adress } = req.body;

    const Ckoutorderrom_cart = await checkoutorder({ adress, Userid });
    res.status(Ckoutorderrom_cart.status).send(Ckoutorderrom_cart.data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
