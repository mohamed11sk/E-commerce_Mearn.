//create context
//create provider
//create usecontext (create context)

import { createContext, useContext } from "react";
import type { CartItems } from "../../../types/CartItemtyoes";

interface CartcontextType {
  CartItems: CartItems[];
  totalamount: number;
  AddItem: (product_id: string) => void;
  updatedquantiy:(product_id:string , quantity:number)=>Promise<void>;
  deleteitemfromcart:(product_id:string )=>Promise<void>;
  clearitem:()=>Promise<void>;
  
}
export const CartContext = createContext<CartcontextType>({
  CartItems: [],
  totalamount: 0,
  AddItem: (_id:string) => {},
  updatedquantiy: async (_productId, _quantity) => {},
  deleteitemfromcart: async (_productId) => {},
  clearitem: async () => {},
});
export const useCart = () => useContext(CartContext);
