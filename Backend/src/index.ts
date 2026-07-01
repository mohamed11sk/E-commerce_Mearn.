import dotenv from 'dotenv'
import express from "express";
import userrouter from "./routers/userrouter.js";
import productrouts from "./routers/productrouts.js";
import mongoose from "mongoose";
import { seedInitialProducts } from "./services/ProductServices.js";
import cartrouter from "./routers/cartrouter.js";
import cors from "cors";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite
    credentials: true,
  })
);

app.get("/", (req, res) => {
  try {
    res.send("Server Running Successfully");
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});
mongoose
  .connect(
  process.env.URLCONNECTION_DATABASE || ""
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/user", userrouter);
app.use("/product", productrouts);
app.use("/cart", cartrouter);
seedInitialProducts();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
