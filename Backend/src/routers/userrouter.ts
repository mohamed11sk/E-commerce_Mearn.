import express from "express";
import { login, register } from "../services/userservices.js";
import ProductModel from "../model/productmodel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const { data, statuscode } = await register({ name, email, pass });
    res.status(statuscode).send(data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const { data, statuscode } = await login({ email, pass });
    res.status(statuscode).send(data);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
