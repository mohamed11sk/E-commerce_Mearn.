import mongoose, { Document, Schema } from "mongoose";

export interface IPRODUCT extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}
const ProductSchema = new Schema<IPRODUCT>({
  title: { required: true, type: String },
  image: { required: true, type: String },
  price: { required: true, type: Number },
  stock: { required: true, type: Number, default: 0 },
});

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
