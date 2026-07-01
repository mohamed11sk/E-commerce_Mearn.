import CartModel from "../model/cartmodel.js";
import orderModel, { Product_order } from "../model/ordermodel.js";
import ProductModel from "../model/productmodel.js";

interface Creatcartforuser {
  Userid: string;
}

export const createCart = async ({ Userid }: Creatcartforuser) => {
  const cart = await CartModel.create({ Userid, totalprince: 0 });
  await cart.save();
  return cart;
};
interface GetActiveCart {
  Userid: string;
}
export const GetActiveCart = async ({ Userid }: GetActiveCart) => {
  let cart = await CartModel.findOne({ Userid, Activity: "Active" });
  if (!cart) {
    cart = await createCart({ Userid });
  }
  return cart;
};
interface AddItem {
  Quntity: number;
  Userid: any;
  productId: string;
}
//delete all products from cart
interface DeleteAll{
Userid:string
}
export const DeletwAlllproduct =async ({Userid}:DeleteAll)=>{
  const cart= await GetActiveCart({Userid});
  cart.items=[];
  cart.totalprince=0;
  const delteall= await cart.save();
    return { data: delteall, status: 200 };
}

// put item in cart and update price
export const AddItemCart = async ({ productId, Quntity, Userid }: AddItem) => {
  const cart = await GetActiveCart({ Userid });

  const itemExist = cart.items.find(
    (item) => item.products.toString() === productId,
  );

  if (itemExist) {
    return { data: "Item Alady exist", status: 400 };
  }

  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "product not exist", status: 400 };
  }
  if (product.stock < Quntity) {
    return { data: "No enght product in stock", status: 400 };
  }
  //Updata totalprice  in cart
  cart.totalprince += product.price * Number(Quntity);

  cart.items.push({
    products: productId,
    Quntity: Number(Quntity),
    priceItem: product.price,
  });
  const updateCart = await cart.save();
  return { data: updateCart, status: 201 };
};

// put item in cart and update price
interface UpdateItemIncart {
  Quntity: number;
  Userid: any;
  productId: string;
}

export const UpdateItemCart = async ({
  productId,
  Quntity,
  Userid,
}: UpdateItemIncart) => {
  const cart = await GetActiveCart({ Userid });

  const itemExist = cart.items.find(
    (item) => item.products.toString() === productId,
  );

  if (!itemExist) {
    return { data: "eror item not exist in cart", status: 400 };
  }
  itemExist.Quntity = Quntity;

  const antoherItem = cart.items.filter(
    (item) => item.products.toString() !== productId,
  );

  let total = antoherItem.reduce((sum, product) => {
    sum += product.Quntity * product.priceItem;
    return sum;
  }, 0);
  total += itemExist.Quntity * itemExist.priceItem;
  cart.totalprince = total;

  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "product not exist", status: 400 };
  }
  if (product.stock < Quntity) {
    return { data: "No enght product in stock", status: 400 };
  }
  const updateCart = await cart.save();
  return { data: updateCart, status: 201 };
};

// Delete item from cart 
interface DeleteItemIncart {
  Userid: any;
  productId: string;
}

export const DeleteItemCart =  async({productId,Userid}:DeleteItemIncart)=>{
   const cart = await GetActiveCart({ Userid });

  const itemExist = cart.items.find(
    (item) => item.products.toString() === productId,
  );

  if (!itemExist) {
    return { data: "eror item not exist in cart", status: 400 };
  }
  const antoherItem= cart.items.filter((items)=> items.products != productId);

  let  total =antoherItem.reduce((sum,product)=>{
      sum += product.Quntity * product.priceItem;
    return sum ;
  },0)
  cart.items=antoherItem;
  cart.totalprince=total;
    const deleteitemcart = await cart.save();
  return { data: deleteitemcart, status: 201 };

}
//Checkout order 
interface Checkout {
  adress:string,
  Userid:any,
}
 export const checkoutorder = async({adress,Userid}:Checkout)=>{
  if(!adress){
      return { data: "Please inter adress", status: 400 };
  }
  const cart = await GetActiveCart({Userid});
  const Product_order_items:Product_order[]=[];
  //loop item from cart 
  for(const item of cart.items){
    const product=await ProductModel.findById(item.products)
    if(!product){
        return { data: "Product Not fOund", status: 400 };
    }
    const arry :Product_order={
  ProductTitle:product.title,
  ProductImage: product.image,
  priceItem: item.priceItem,
  Quntity:item.Quntity
  }
   //put item in arry
  Product_order_items.push(arry);

  }
    //Push array in checkout order model.p
  const CreateOrder=await orderModel.create({
  Userid,
  adress,
  totalprice:cart.totalprince,
  items: Product_order_items,
  })

  const order = await CreateOrder.save();
    cart.Activity="Complete";
  await cart.save();
  return {data:order , status:200};
}