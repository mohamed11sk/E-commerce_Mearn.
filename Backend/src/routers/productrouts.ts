import express from "express";
import ProductModel from "../model/productmodel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
