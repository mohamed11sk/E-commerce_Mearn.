import mongoose ,{Document , ObjectId, Schema} from "mongoose";



export interface Product_order{
  ProductTitle:string;
  ProductImage:string
  priceItem:number;
  Quntity:number;

}
export interface IOrder extends Document {
  Userid: ObjectId | string;
  adress:string;
  totalprice:number;
  items: Product_order[];
}
const Product_order_Schema=new Schema <Product_order>({
ProductTitle:{ type:String,required:true},
  ProductImage:{ type:String,required:true},
  priceItem:{ type:Number,required:true},
  Quntity:{ type:Number,required:true},

})

const OrferSchema=new Schema <IOrder>({
  Userid:{ type:String,required:true},
  adress:{ type:String,required:true},
  totalprice:{ type:Number,required:true},
  items: [Product_order_Schema],

})
const orderModel=mongoose.model("Orders",OrferSchema)
export default orderModel;