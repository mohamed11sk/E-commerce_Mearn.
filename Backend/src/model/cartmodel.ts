import mongoose, { Document, Schema, ObjectId } from "mongoose";
import { IPRODUCT } from "./productmodel.js";

const Cartstatusenum = ["Active", "Complete"];
export interface Products {
  products: IPRODUCT | string;
  priceItem: number;
  Quntity: number;
}

export interface Icart extends Document {
  Userid: ObjectId | string;
  items: Products[];
  totalprince: number;
  Activity: "Active" | "Complete";
}

const ProductsSchema = new Schema<Products>({
  products: { type: Schema.Types.ObjectId, ref: "Products", required: true },
  priceItem: { type: Number, required: true },
  Quntity: { type: Number, required: true },
});

const IcartSchema = new Schema<Icart>({
  Userid: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  items: [ProductsSchema],
  totalprince: { type: Number, required: true },
  Activity: {
    type: String,
    enum: Cartstatusenum,
    required: true,
    default: "Active",
  },
});

const cartmodel = mongoose.model("Cart", IcartSchema);
export default cartmodel;
