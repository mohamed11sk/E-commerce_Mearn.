import express from "express";
import { getorder, login, register } from "../services/userservices.js";
import ProductModel from "../model/productmodel.js";
import validationJwt from "../modileware/validationJWT.js";
import { ExtendRequest } from "../types/extendReqest.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const { data, statuscode } = await register({ name, email, pass });
    res.status(statuscode).json(data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const { data, statuscode } = await login({ email, pass });
    res.status(statuscode).json(data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
// put item in cart and update price
router.get("/order", validationJwt, async (req: ExtendRequest, res) => {
  try {
    const Userid = req.user._id;

    const getorders = await getorder({ Userid });
    res.status(getorders.statuscode).send(getorders.data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});


export default router;
